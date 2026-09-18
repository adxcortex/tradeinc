"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";
import { createSession, deleteSession } from "@/lib/session";

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!username || !password) {
    return { error: "Enter your username and password." };
  }

  await connectToDatabase();
  const user = await User.findOne({ username });

  if (!user) {
    return { error: "Invalid username or password." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid username or password." };
  }

  await createSession({ userId: String(user._id), username: user.username, name: user.name });
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
