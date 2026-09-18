export function Skel({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-zinc-200/70 dark:bg-zinc-800/70 ${className}`} />;
}

export function CardSkel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 ${className}`}
    >
      <Skel className="h-3 w-24" />
      <Skel className="mt-3 h-8 w-16" />
      <Skel className="mt-3 h-2 w-full" />
    </div>
  );
}
