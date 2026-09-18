// Seeds the 4 fixed trader accounts. Run with `npm run seed`.
// Reads MONGODB_URI from the environment (.env.local is loaded automatically).
import { config } from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { User } from "../lib/models/User";

config({ path: ".env.local" });
config(); // fall back to .env for anything not set in .env.local

const DEFAULT_NAMES = ["Trader One", "Trader Two", "Trader Three", "Trader Four"];

function randomPassword() {
  return randomBytes(6).toString("base64url");
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local first (see .env.example).");
  }

  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || "vansp_trading" });

  const existing = await User.countDocuments();
  if (existing > 0) {
    console.log(`Users already exist (${existing}) — skipping seed. Delete the "users" collection to reseed.`);
    await mongoose.disconnect();
    return;
  }

  const created: { username: string; password: string }[] = [];

  for (let i = 0; i < 4; i++) {
    const name = process.env[`SEED_USER_${i + 1}_NAME`] || DEFAULT_NAMES[i];
    const username = (process.env[`SEED_USER_${i + 1}_USERNAME`] || name).toLowerCase().replace(/\s+/g, "");
    const password = process.env[`SEED_USER_${i + 1}_PASSWORD`] || randomPassword();
    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ name, username, passwordHash, colorSlot: i + 1 });
    created.push({ username, password });
  }

  console.log("\nSeeded 4 users. Share these logins (passwords are shown once):\n");
  for (const u of created) {
    console.log(`  ${u.username}  /  ${u.password}`);
  }
  console.log("\nEach person should log in and can be given a real name via SEED_USER_N_NAME env vars on reseed.\n");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
