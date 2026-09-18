import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@/lib/session";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";

// Cached per-request: safe to call verifySession()/getCurrentUser() from many
// components without hitting the cookie/DB more than once per render pass.
export const verifySession = cache(async () => {
  const session = await getSessionPayload();
  if (!session?.userId) {
    redirect("/login");
  }
  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  await connectToDatabase();
  const user = await User.findById(session.userId).select("_id username name colorSlot avatarDataUrl").lean();
  if (!user) {
    redirect("/login");
  }
  return {
    id: String(user._id),
    username: user.username,
    name: user.name,
    colorSlot: user.colorSlot,
    avatarDataUrl: user.avatarDataUrl || null,
  };
});

// Non-redirecting variant for the login page / proxy-style optimistic checks.
export async function getOptionalSession() {
  return getSessionPayload();
}
