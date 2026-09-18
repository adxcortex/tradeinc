"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { connectToDatabase } from "@/lib/db";
import { Progress, PROGRESS_STATUSES, type ProgressStatus } from "@/lib/models/Progress";
import { curriculumBySlug } from "@/lib/curriculum";

export async function setProgressStatus(slug: string, status: ProgressStatus) {
  const session = await verifySession();
  if (!curriculumBySlug(slug)) throw new Error("Unknown curriculum item");
  if (!PROGRESS_STATUSES.includes(status)) throw new Error("Invalid status");

  await connectToDatabase();
  await Progress.findOneAndUpdate(
    { userId: session.userId, slug },
    {
      $set: {
        status,
        completedAt: status === "done" ? new Date() : null,
      },
    },
    { upsert: true }
  );

  revalidatePath("/curriculum");
  revalidatePath(`/curriculum/${slug}`);
  revalidatePath("/dashboard");
}

export async function saveNote(slug: string, note: string) {
  const session = await verifySession();
  if (!curriculumBySlug(slug)) throw new Error("Unknown curriculum item");

  await connectToDatabase();
  await Progress.findOneAndUpdate(
    { userId: session.userId, slug },
    { $set: { note: note.slice(0, 10000) } },
    { upsert: true }
  );

  revalidatePath(`/curriculum/${slug}`);
}
