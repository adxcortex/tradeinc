import Link from "next/link";
import { getAllUsers, getUserProgressStats, getUserTradeStats, PHASES } from "@/lib/stats";
import { seriesVar } from "@/lib/colors";
import { ProgressBar } from "../components/progress-bar";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const users = await getAllUsers();
  const [progressStats, tradeStats] = await Promise.all([
    Promise.all(users.map((u) => getUserProgressStats(u.id))),
    Promise.all(users.map((u) => getUserTradeStats(u.id))),
  ]);

  const teamDone = progressStats.reduce((sum, s) => sum + s.done, 0);
  const teamTotal = progressStats.reduce((sum, s) => sum + s.totalItems, 0);
  const teamPercent = teamTotal ? Math.round((teamDone / teamTotal) * 100) : 0;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Team dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          90-day trading curriculum &middot; {users.length} traders &middot; team is {teamPercent}% through the
          plan.
        </p>
      </div>

      {/* Stat tiles — one per user, categorical color follows the person. */}
      <section aria-label="Per-trader progress" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {users.map((user, i) => {
          const stats = progressStats[i];
          return (
            <div
              key={user.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: seriesVar(user.colorSlot) }}
                />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{user.name}</span>
              </div>
              <div className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
                {stats.percentDone}%
              </div>
              <div className="mt-2">
                <ProgressBar percent={stats.percentDone} color={seriesVar(user.colorSlot)} />
              </div>
              <dl className="mt-3 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <div>
                  <dt className="sr-only">Items done</dt>
                  <dd>
                    {stats.done}/{stats.totalItems} items
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Current streak</dt>
                  <dd>{stats.currentStreak > 0 ? `${stats.currentStreak} day streak` : "No active streak"}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </section>

      {/* Phase breakdown — small multiples, one row per phase, one bar per trader. */}
      <section aria-label="Progress by phase">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Progress by phase</h2>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          {users.map((user) => (
            <span key={user.id} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: seriesVar(user.colorSlot) }} />
              {user.name}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          {PHASES.map((phase) => (
            <div key={phase.phase}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Phase {phase.phase} &middot; {phase.title}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{phase.dayRange}</span>
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                {users.map((user, i) => {
                  const bucket = progressStats[i].phases.find((p) => p.phase === phase.phase);
                  const percent = bucket && bucket.total ? Math.round((bucket.done / bucket.total) * 100) : 0;
                  return (
                    <div key={user.id} className="flex items-center gap-2">
                      <span className="w-20 shrink-0 truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {user.name}
                      </span>
                      <ProgressBar percent={percent} color={seriesVar(user.colorSlot)} />
                      <span className="w-9 shrink-0 text-right text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                        {percent}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trade journal stats */}
      <section aria-label="Trade journal statistics">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Trade journal (win rate & expectancy)</h2>
          <Link href="/journal" className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-400">
            Open journal &rarr;
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="px-4 py-3 font-medium">Trader</th>
                <th className="px-4 py-3 font-medium">Closed trades</th>
                <th className="px-4 py-3 font-medium">Win rate</th>
                <th className="px-4 py-3 font-medium">Avg win (R)</th>
                <th className="px-4 py-3 font-medium">Avg loss (R)</th>
                <th className="px-4 py-3 font-medium">Expectancy (R)</th>
                <th className="px-4 py-3 font-medium">Profit factor</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                const t = tradeStats[i];
                return (
                  <tr key={user.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{ backgroundColor: seriesVar(user.colorSlot) }}
                        />
                        {user.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums">{t.total}</td>
                    <td className="px-4 py-3 tabular-nums">{t.total ? `${t.winRate}%` : "—"}</td>
                    <td className="px-4 py-3 tabular-nums">{t.total ? t.avgWin : "—"}</td>
                    <td className="px-4 py-3 tabular-nums">{t.total ? t.avgLoss : "—"}</td>
                    <td className="px-4 py-3 tabular-nums font-medium">{t.total ? t.expectancy : "—"}</td>
                    <td className="px-4 py-3 tabular-nums">{t.profitFactor ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Expectancy = (win rate x avg win) - (loss rate x avg loss). Positive expectancy over 100+ trades is the
          goal — not a win every day.
        </p>
      </section>
    </div>
  );
}
