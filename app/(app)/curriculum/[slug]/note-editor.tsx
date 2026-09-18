"use client";

import { useActionState, useState } from "react";
import { saveNote } from "@/lib/actions/progress";

type State = { saved: boolean };

export function NoteEditor({ slug, initialNote }: { slug: string; initialNote: string }) {
  const [note, setNote] = useState(initialNote);
  const [state, action, pending] = useActionState<State, FormData>(async (_prev, formData) => {
    await saveNote(slug, String(formData.get("note") || ""));
    return { saved: true };
  }, { saved: false });

  return (
    <form action={action} className="flex flex-col gap-2">
      <textarea
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={6}
        placeholder="Your personal notes on this topic — what clicked, what's still confusing, examples you found..."
        className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-300"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="w-fit rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          {pending ? "Saving..." : "Save note"}
        </button>
        {state.saved && !pending && <span className="text-xs text-zinc-500 dark:text-zinc-400">Saved.</span>}
      </div>
    </form>
  );
}
