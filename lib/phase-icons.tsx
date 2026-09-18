import {
  Landmark,
  LineChart,
  Activity,
  Target,
  ShieldAlert,
  ClipboardList,
  FlaskConical,
  NotebookPen,
  Rocket,
  type LucideIcon,
} from "lucide-react";

// One icon per curriculum phase — purely visual, keyed to lib/curriculum.ts PHASES.
export const PHASE_ICONS: Record<number, LucideIcon> = {
  1: Landmark,
  2: LineChart,
  3: Activity,
  4: Target,
  5: ShieldAlert,
  6: ClipboardList,
  7: FlaskConical,
  8: NotebookPen,
  9: Rocket,
};

export function PhaseIcon({ phase, className = "h-4.5 w-4.5" }: { phase: number; className?: string }) {
  const Icon = PHASE_ICONS[phase] ?? Target;
  return <Icon className={className} strokeWidth={2} aria-hidden />;
}
