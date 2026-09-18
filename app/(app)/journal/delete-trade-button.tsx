"use client";

import { useTransition } from "react";
import { deleteTrade } from "@/lib/actions/trades";

export function DeleteTradeButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm("Delete this trade?")) startTransition(() => deleteTrade(id));
      }}
      className="text-xs text-zinc-400 hover:text-red-600 disabled:opacity-60 dark:hover:text-red-400"
    >
      Delete
    </button>
  );
}
