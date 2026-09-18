"use client";

import { useActionState } from "react";
import { addTrade, type TradeFormState } from "@/lib/actions/trades";

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-300";
const labelClass = "text-xs font-medium text-zinc-600 dark:text-zinc-400";

export function TradeForm() {
  const [state, action, pending] = useActionState<TradeFormState, FormData>(addTrade, undefined);

  return (
    <form action={action} className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200 bg-white p-5 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <label className={labelClass}>Date</label>
        <input type="date" name="date" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Ticker</label>
        <input type="text" name="ticker" required placeholder="RELIANCE" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Kind</label>
        <select name="kind" defaultValue="paper" className={inputClass}>
          <option value="backtest">Backtest</option>
          <option value="paper">Paper</option>
          <option value="live">Live</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Setup</label>
        <select name="setup" defaultValue="other" className={inputClass}>
          <option value="trend_continuation">Trend continuation</option>
          <option value="breakout">Breakout</option>
          <option value="mean_reversion">Mean reversion</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Entry</label>
        <input type="number" step="0.01" name="entry" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Stop</label>
        <input type="number" step="0.01" name="stop" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Target</label>
        <input type="number" step="0.01" name="target" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Exit</label>
        <input type="number" step="0.01" name="exit" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Quantity</label>
        <input type="number" step="1" name="quantity" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Result</label>
        <select name="result" defaultValue="open" className={inputClass}>
          <option value="open">Open</option>
          <option value="win">Win</option>
          <option value="loss">Loss</option>
          <option value="breakeven">Breakeven</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>R multiple</label>
        <input type="number" step="0.01" name="rMultiple" placeholder="e.g. 2 or -1" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Market regime</label>
        <input type="text" name="marketRegime" placeholder="trend / range" className={inputClass} />
      </div>
      <div className="col-span-2 sm:col-span-4">
        <label className={labelClass}>Reason for entry</label>
        <input type="text" name="reason" className={inputClass} />
      </div>
      <div className="col-span-2 sm:col-span-4">
        <label className={labelClass}>Notes</label>
        <textarea name="notes" rows={2} className={inputClass} />
      </div>
      {state?.error && <p className="col-span-2 text-sm text-red-600 sm:col-span-4 dark:text-red-400">{state.error}</p>}
      <div className="col-span-2 sm:col-span-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          {pending ? "Saving..." : "Add trade"}
        </button>
      </div>
    </form>
  );
}
