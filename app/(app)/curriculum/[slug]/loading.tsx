import { Skel } from "../../components/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <Skel className="h-4 w-24" />
        <Skel className="mt-3 h-3 w-32" />
        <Skel className="mt-2 h-7 w-72" />
      </div>
      <div>
        <Skel className="h-4 w-32" />
        <div className="mt-2 flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skel key={i} className="h-3.5 w-full" />
          ))}
        </div>
      </div>
      <div>
        <Skel className="h-4 w-24" />
        <Skel className="mt-2 h-9 w-64 rounded-full" />
      </div>
      <div>
        <Skel className="h-4 w-24" />
        <Skel className="mt-2 h-32 w-full rounded-lg" />
      </div>
    </div>
  );
}
