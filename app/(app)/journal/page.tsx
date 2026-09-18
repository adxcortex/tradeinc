import { TrendingUp, TrendingDown, Minus, Clock3 } from "lucide-react";
import { getCurrentUser } from "@/lib/dal";
import { connectToDatabase } from "@/lib/db";
import { TradeLog } from "@/lib/models/TradeLog";
import { getUserTradeStats } from "@/lib/stats";
import { TradeForm } from "./trade-form";
import { DeleteTradeButton } from "./delete-trade-button";

export const dynamic = "force-dynamic";

const RESULT_STYLE: Record<string, { className: string; Icon: typeof TrendingUp }> = {
  win: { className: "text-[var(--status-good)]", Icon: TrendingUp },
  loss: { className: "text-[var(--status-critical)]", Icon: TrendingDown },
  breakeven: { className: "text-zinc-500 dark:text-zinc-400", Icon: Minus },
  open: { className: "text-[var(--status-warning)]", Icon: Clock3 },
};

export default async function JournalPage() {
  const user = await getCurrentUser();
  await connectToDatabase();
  const [trades, stats] = await Promise.all([
    TradeLog.find({ userId: user.id }).sort({ date: -1, createdAt: -1 }).lean(),
    getUserTradeStats(user.id),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Trade journal</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Log backtest, paper and live trades. Aim for 100+ before drawing conclusions from win rate or expectancy.
        </p>
      </div>

      {stats.total > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Closed trades</p>
            <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Win rate</p>
            <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{stats.winRate}%</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Expectancy (R)</p>
            <p
              className={`mt-1 text-xl font-semibold ${
                stats.expectancy > 0 ? "text-[var(--status-good)]" : "text-[var(--status-critical)]"
              }`}
            >
              {stats.expectancy}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Profit factor</p>
            <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{stats.profitFactor ?? "—"}</p>
          </div>
        </div>
      )}

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
            {trades.map((t) => {
              const { className, Icon } = RESULT_STYLE[t.result] ?? RESULT_STYLE.open;
              return (
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
                  <td className={`px-4 py-3 font-medium ${className}`}>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      {t.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{t.rMultiple ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <DeleteTradeButton id={String(t._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
