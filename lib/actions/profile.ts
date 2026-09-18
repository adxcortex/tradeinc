"use server";

import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";
import { createSession } from "@/lib/session";

const MAX_AVATAR_BYTES = 1.5 * 1024 * 1024; // 1.5MB source image
const ALLOWED_AVATAR_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

// mongoose@9's generated filter types reject a literal ObjectId in an update
// filter (a typegen quirk, not a runtime issue) — see the matching note in
// lib/actions/trades.ts.
function byId(id: string) {
  return { _id: new Types.ObjectId(id) } as unknown as Parameters<typeof User.updateOne>[0];
}

export type ProfileFormState = { error?: string; success?: string } | undefined;

export async function updateProfile(_prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
  const session = await verifySession();

  const name = String(formData.get("name") || "").trim();
  const username = String(formData.get("username") || "").trim().toLowerCase();

  if (!name || name.length < 2) {
    return { error: "Name must be at least 2 characters." };
  }
  if (!/^[a-z0-9_.]{3,20}$/.test(username)) {
    return { error: "Username must be 3-20 characters: lowercase letters, numbers, dot or underscore." };
  }

  await connectToDatabase();

  const clashFilter = { username, _id: { $ne: new Types.ObjectId(session.userId) } } as unknown as Parameters<
    typeof User.findOne
  >[0];
  const clash = await User.findOne(clashFilter).lean();
  if (clash) {
    return { error: "That username is already taken." };
  }

  await User.updateOne(byId(session.userId), { $set: { name, username } });

  // Session cookie carries name/username — refresh it so the header updates now.
  await createSession({ userId: String(session.userId), username, name });

  revalidatePath("/", "layout");
  return { success: "Profile updated." };
}

export async function changePassword(_prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
  const session = await verifySession();

  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "New password and confirmation don't match." };
  }

  await connectToDatabase();
  const user = await User.findById(session.userId);
  if (!user) return { error: "User not found." };

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { success: "Password changed." };
}

export async function updateAvatar(_prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
  const session = await verifySession();

  const file = formData.get("avatar");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image file first." };
  }
  if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
    return { error: "Use a PNG, JPEG, WEBP or GIF image." };
  }
  if (file.size > MAX_AVATAR_BYTES) {
    return { error: "Image is too large — keep it under 1.5MB." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

  await connectToDatabase();
  await User.updateOne(byId(session.userId), { $set: { avatarDataUrl: dataUrl } });

  revalidatePath("/", "layout");
  return { success: "Avatar updated." };
}

export async function removeAvatar() {
  const session = await verifySession();
  await connectToDatabase();
  await User.updateOne(byId(session.userId), { $set: { avatarDataUrl: null } });
  revalidatePath("/", "layout");
}
