import Link from "next/link";
import { notFound } from "next/navigation";
import { curriculumBySlug } from "@/lib/curriculum";
import { getCurrentUser } from "@/lib/dal";
import { connectToDatabase } from "@/lib/db";
import { Progress, type ProgressStatus } from "@/lib/models/Progress";
import { seriesVar } from "@/lib/colors";
import { getAllUsers } from "@/lib/stats";
import { StatusSelector } from "./status-selector";
import { NoteEditor } from "./note-editor";

export const dynamic = "force-dynamic";

export default async function CurriculumItemPage(props: PageProps<"/curriculum/[slug]">) {
  const { slug } = await props.params;
  const item = curriculumBySlug(slug);
  if (!item) notFound();

  const user = await getCurrentUser();
  await connectToDatabase();

  const [myRecord, allRecords, users] = await Promise.all([
    Progress.findOne({ userId: user.id, slug }).lean(),
    Progress.find({ slug }).lean(),
    getAllUsers(),
  ]);

  const recordsByUser = new Map(allRecords.map((r) => [String(r.userId), r.status as ProgressStatus]));

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <Link href="/curriculum" className="text-sm text-zinc-500 hover:underline dark:text-zinc-400">
          &larr; Curriculum
        </Link>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {item.dayLabel} &middot; Phase {item.phase}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h1>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">What to cover</h2>
        <ul className="mt-2 flex flex-col gap-1.5">
          {item.topics.map((topic) => (
            <li key={topic} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              {topic}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Your status</h2>
        <div className="mt-2">
          <StatusSelector slug={slug} status={(myRecord?.status as ProgressStatus) || "not_started"} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Your notes</h2>
        <div className="mt-2">
          <NoteEditor slug={slug} initialNote={myRecord?.note || ""} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Team status</h2>
        <ul className="mt-2 flex flex-wrap gap-3">
          {users.map((u) => {
            const status = recordsByUser.get(u.id) || "not_started";
            return (
              <li
                key={u.id}
                className="flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-xs dark:border-zinc-800"
              >
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: seriesVar(u.colorSlot) }} />
                <span className="text-zinc-700 dark:text-zinc-300">{u.name}</span>
                <span className="text-zinc-400 dark:text-zinc-500">
                  {status === "done" ? "done" : status === "in_progress" ? "in progress" : "not started"}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Notes are personal — only your own note is visible to you.
        </p>
      </section>
    </div>
  );
}
