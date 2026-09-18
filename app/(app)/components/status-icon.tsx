import { CircleCheckBig, CircleDashed, Circle } from "lucide-react";
import type { ProgressStatus } from "@/lib/models/Progress";

const STATUS_ICON = {
  done: { Icon: CircleCheckBig, className: "text-[var(--status-good)]" },
  in_progress: { Icon: CircleDashed, className: "text-[var(--status-warning)]" },
  not_started: { Icon: Circle, className: "text-zinc-300 dark:text-zinc-700" },
} satisfies Record<ProgressStatus, { Icon: typeof Circle; className: string }>;

export function StatusIcon({ status, className = "h-4 w-4" }: { status: ProgressStatus; className?: string }) {
  const { Icon, className: color } = STATUS_ICON[status];
  return <Icon className={`${className} shrink-0 ${color}`} strokeWidth={2} aria-hidden />;
}
