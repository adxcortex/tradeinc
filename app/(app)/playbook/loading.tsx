import { Skel } from "../components/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10">
      <div>
        <Skel className="h-7 w-56" />
        <Skel className="mt-2 h-4 w-96" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Skel className="h-4 w-56" />
          <Skel className="mt-2 h-3 w-full" />
          <Skel className="mt-1 h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}
