import { Skel } from "../components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Skel className="h-7 w-40" />
        <Skel className="mt-2 h-4 w-96" />
      </div>
      <Skel className="h-64 w-full rounded-2xl" />
      <Skel className="h-72 w-full rounded-2xl" />
    </div>
  );
}
