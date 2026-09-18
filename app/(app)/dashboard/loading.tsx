import { Skel, CardSkel } from "../components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Skel className="h-7 w-56" />
        <Skel className="mt-2 h-4 w-80" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkel key={i} />
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <Skel className="h-5 w-40" />
        <div className="mt-4 flex flex-col gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skel className="h-4 w-48" />
              <div className="mt-2 flex flex-col gap-1.5">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skel key={j} className="h-4 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
