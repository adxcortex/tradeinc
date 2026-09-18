"use client";

import { useOptimistic, useTransition } from "react";
import { CircleCheckBig, CircleDashed, Circle } from "lucide-react";
import { setProgressStatus } from "@/lib/actions/progress";
import type { ProgressStatus } from "@/lib/models/Progress";

const OPTIONS: { value: ProgressStatus; label: string; icon: typeof Circle }[] = [
  { value: "not_started", label: "Not started", icon: Circle },
  { value: "in_progress", label: "In progress", icon: CircleDashed },
  { value: "done", label: "Done", icon: CircleCheckBig },
];

export function StatusSelector({ slug, status }: { slug: string; status: ProgressStatus }) {
  const [isPending, startTransition] = useTransition();
  // Optimistic so a click feels instant even while the write round-trips to Mongo.
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);

  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => {
        const active = optimisticStatus === opt.value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                setOptimisticStatus(opt.value);
                await setProgressStatus(slug, opt.value);
              })
            }
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
              active
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
