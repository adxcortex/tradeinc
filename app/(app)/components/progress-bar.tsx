// Thin, rounded-end progress bar. Color follows the entity (a user or a
// status), so callers pass a CSS color value, never a bare hue name.
export function ProgressBar({
  percent,
  color,
  trackClassName = "",
}: {
  percent: number;
  color: string;
  trackClassName?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 ${trackClassName}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width]"
        style={{ width: `${clamped}%`, backgroundColor: color }}
      />
    </div>
  );
}
