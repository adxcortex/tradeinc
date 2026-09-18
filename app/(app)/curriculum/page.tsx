import Link from "next/link";
import { connectToDatabase } from "@/lib/db";
import { Progress, type ProgressStatus } from "@/lib/models/Progress";
import { CURRICULUM, PHASES, curriculumByPhase } from "@/lib/curriculum";
import { getCurrentUser } from "@/lib/dal";
import { ProgressBar } from "../components/progress-bar";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<ProgressStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  done: "Done",
};

const STATUS_DOT: Record<ProgressStatus, string> = {
  not_started: "bg-zinc-300 dark:bg-zinc-700",
  in_progress: "bg-[var(--status-warning)]",
  done: "bg-[var(--status-good)]",
};

export default async function CurriculumPage() {
  const user = await getCurrentUser();
  await connectToDatabase();
  const records = await Progress.find({ userId: user.id }).lean();
  const bySlug = new Map(records.map((r) => [r.slug, r.status as ProgressStatus]));

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Curriculum</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {CURRICULUM.length} items across the 90-day plan. Mark items as you go and add your own notes on each.
        </p>
      </div>

      {PHASES.map((phase) => {
        const items = curriculumByPhase(phase.phase);
        const done = items.filter((i) => bySlug.get(i.slug) === "done").length;
        const percent = items.length ? Math.round((done / items.length) * 100) : 0;

        return (
          <section key={phase.phase}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Phase {phase.phase} &middot; {phase.title}
              </h2>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {phase.dayRange} &middot; {done}/{items.length} done
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{phase.description}</p>
            <div className="mt-2 max-w-xs">
              <ProgressBar percent={percent} color="var(--series-1)" />
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {items.map((item) => {
                const status = bySlug.get(item.slug) || "not_started";
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/curriculum/${item.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                    >
                      <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT[status]}`} />
                      <span className="flex-1">
                        <span className="block font-medium text-zinc-900 dark:text-zinc-50">{item.title}</span>
                        <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                          {item.dayLabel} &middot; {STATUS_LABEL[status]}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
