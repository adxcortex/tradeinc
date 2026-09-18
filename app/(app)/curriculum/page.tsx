import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { connectToDatabase } from "@/lib/db";
import { Progress, type ProgressStatus } from "@/lib/models/Progress";
import { CURRICULUM, PHASES, curriculumByPhase } from "@/lib/curriculum";
import { getCurrentUser } from "@/lib/dal";
import { PhaseIcon } from "@/lib/phase-icons";
import { ProgressBar } from "../components/progress-bar";
import { StatusIcon } from "../components/status-icon";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<ProgressStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  done: "Done",
};

export default async function CurriculumPage() {
  const user = await getCurrentUser();
  await connectToDatabase();
  const records = await Progress.find({ userId: user.id }).select("slug status").lean();
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
        const complete = items.length > 0 && done === items.length;

        return (
          <section key={phase.phase}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    complete
                      ? "bg-[var(--status-good)]/15 text-[var(--status-good)]"
                      : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  <PhaseIcon phase={phase.phase} />
                </span>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Phase {phase.phase} &middot; {phase.title}
                </h2>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {phase.dayRange} &middot; {done}/{items.length} done
              </span>
            </div>
            <p className="ml-10.5 mt-1 text-sm text-zinc-500 dark:text-zinc-400">{phase.description}</p>
            <div className="ml-10.5 mt-2 max-w-xs">
              <ProgressBar percent={percent} color="var(--series-1)" />
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {items.map((item) => {
                const status = bySlug.get(item.slug) || "not_started";
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/curriculum/${item.slug}`}
                      className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                    >
                      <StatusIcon status={status} className="h-4.5 w-4.5" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-zinc-900 dark:text-zinc-50">
                          {item.title}
                        </span>
                        <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                          {item.dayLabel} &middot; {STATUS_LABEL[status]}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-400"
                        aria-hidden
                      />
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
