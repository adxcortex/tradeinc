"use client";

import { Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function SubmitButton({
  pending,
  icon: Icon,
  label,
  pendingLabel,
  variant = "primary",
}: {
  pending: boolean;
  icon: LucideIcon;
  label: string;
  pendingLabel?: string;
  variant?: "primary" | "secondary";
}) {
  const base = "inline-flex w-fit items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900";

  return (
    <button type="submit" disabled={pending} className={`${base} ${styles}`}>
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Icon className="h-3.5 w-3.5" aria-hidden />}
      {pending ? pendingLabel || "Saving..." : label}
    </button>
  );
}
