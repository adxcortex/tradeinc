import { Skel } from "../components/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-10">
      <div>
        <Skel className="h-7 w-40" />
        <Skel className="mt-2 h-4 w-72" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skel key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>
  );
}
