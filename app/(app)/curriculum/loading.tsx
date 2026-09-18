import { Skel } from "../components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Skel className="h-7 w-40" />
        <Skel className="mt-2 h-4 w-96" />
      </div>
      {Array.from({ length: 2 }).map((_, i) => (
        <section key={i}>
          <Skel className="h-5 w-64" />
          <Skel className="mt-2 h-4 w-80" />
          <Skel className="mt-3 h-2 w-40" />
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skel key={j} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
