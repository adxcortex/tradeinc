"use client";

import { useTransition } from "react";
import { setProgressStatus } from "@/lib/actions/progress";
import type { ProgressStatus } from "@/lib/models/Progress";

const OPTIONS: { value: ProgressStatus; label: string }[] = [
  { value: "not_started", label: "Not started" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
];

export function StatusSelector({ slug, status }: { slug: string; status: ProgressStatus }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      {OPTIONS.map((opt) => {
        const active = status === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={isPending}
            onClick={() => startTransition(() => setProgressStatus(slug, opt.value))}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
              active
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
