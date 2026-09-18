import { getCurrentUser } from "@/lib/dal";
import { connectToDatabase } from "@/lib/db";
import { TradeLog } from "@/lib/models/TradeLog";
import { TradeForm } from "./trade-form";
import { DeleteTradeButton } from "./delete-trade-button";

export const dynamic = "force-dynamic";

const RESULT_CLASS: Record<string, string> = {
  win: "text-[var(--status-good)]",
  loss: "text-[var(--status-critical)]",
  breakeven: "text-zinc-500 dark:text-zinc-400",
  open: "text-[var(--status-warning)]",
};

export default async function JournalPage() {
  const user = await getCurrentUser();
  await connectToDatabase();
  const trades = await TradeLog.find({ userId: user.id }).sort({ date: -1, createdAt: -1 }).lean();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Trade journal</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Log backtest, paper and live trades. Aim for 100+ before drawing conclusions from win rate or expectancy.
        </p>
      </div>

      <TradeForm />

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Ticker</th>
              <th className="px-4 py-3 font-medium">Kind</th>
              <th className="px-4 py-3 font-medium">Setup</th>
              <th className="px-4 py-3 font-medium">Entry</th>
              <th className="px-4 py-3 font-medium">Stop</th>
              <th className="px-4 py-3 font-medium">Target</th>
              <th className="px-4 py-3 font-medium">Result</th>
              <th className="px-4 py-3 font-medium">R</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No trades logged yet.
                </td>
              </tr>
            )}
            {trades.map((t) => (
              <tr key={String(t._id)} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                <td className="px-4 py-3 tabular-nums">{new Date(t.date).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3 font-medium">{t.ticker}</td>
                <td className="px-4 py-3 capitalize text-zinc-500 dark:text-zinc-400">{t.kind}</td>
                <td className="px-4 py-3 capitalize text-zinc-500 dark:text-zinc-400">
                  {t.setup.replace("_", " ")}
                </td>
                <td className="px-4 py-3 tabular-nums">{t.entry}</td>
                <td className="px-4 py-3 tabular-nums">{t.stop}</td>
                <td className="px-4 py-3 tabular-nums">{t.target ?? "—"}</td>
                <td className={`px-4 py-3 font-medium ${RESULT_CLASS[t.result] ?? ""}`}>{t.result}</td>
                <td className="px-4 py-3 tabular-nums">{t.rMultiple ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteTradeButton id={String(t._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
