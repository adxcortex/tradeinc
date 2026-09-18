import Link from "next/link";
import { Trophy, Flame, Target, TrendingUp, TrendingDown, ArrowRight, CircleCheckBig } from "lucide-react";
import { getAllUsers, getAllProgressStats, getAllTradeStats, PHASES } from "@/lib/stats";
import { seriesVar } from "@/lib/colors";
import { ProgressBar } from "../components/progress-bar";

export const dynamic = "force-dynamic";

const RANK_STYLE = [
  { icon: "🥇", ring: "ring-2 ring-[var(--status-warning)]" },
  { icon: "🥈", ring: "ring-2 ring-zinc-300 dark:ring-zinc-600" },
  { icon: "🥉", ring: "ring-2 ring-[#c98505]/40" },
];

export default async function DashboardPage() {
  const users = await getAllUsers();
  const userIds = users.map((u) => u.id);
  const [progressMap, tradeMap] = await Promise.all([getAllProgressStats(userIds), getAllTradeStats(userIds)]);

  const ranked = users
    .map((u) => ({ user: u, stats: progressMap.get(u.id)! }))
    .sort((a, b) => b.stats.percentDone - a.stats.percentDone || b.stats.done - a.stats.done);

  const teamDone = users.reduce((sum, u) => sum + (progressMap.get(u.id)?.done || 0), 0);
  const teamTotal = users.reduce((sum, u) => sum + (progressMap.get(u.id)?.totalItems || 0), 0);
  const teamPercent = teamTotal ? Math.round((teamDone / teamTotal) * 100) : 0;
  const leader = ranked[0];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Team dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          90-day trading curriculum &middot; {users.length} traders &middot; team is{" "}
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{teamPercent}%</span> through the plan.
        </p>
      </div>

      {/* Leaderboard — the competition-spirit centerpiece */}
      <section aria-label="Leaderboard">
        <div className="mb-3 flex items-center gap-2">
          <Trophy className="h-4.5 w-4.5 text-[var(--status-warning)]" strokeWidth={2} aria-hidden />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Leaderboard</h2>
          {leader && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              — {leader.user.name} is in the lead at {leader.stats.percentDone}%
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          {ranked.map(({ user, stats }, i) => (
            <div
              key={user.id}
              className={`flex items-center gap-4 rounded-xl px-3 py-3 transition-colors ${
                i === 0 ? "bg-zinc-50 dark:bg-zinc-900/60" : ""
              }`}
            >
              <span className="w-7 shrink-0 text-center text-base font-semibold text-zinc-400 dark:text-zinc-600">
                {RANK_STYLE[i]?.icon ?? `#${i + 1}`}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${RANK_STYLE[i]?.ring ?? ""}`}
                style={{ backgroundColor: seriesVar(user.colorSlot) }}
              >
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">{user.name}</span>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                    {stats.percentDone}%
                  </span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar percent={stats.percentDone} color={seriesVar(user.colorSlot)} />
                </div>
              </div>
              <div className="hidden shrink-0 items-center gap-3 text-xs text-zinc-500 sm:flex dark:text-zinc-400">
                <span className="inline-flex items-center gap-1">
                  <CircleCheckBig className="h-3.5 w-3.5" aria-hidden />
                  {stats.done}/{stats.totalItems}
                </span>
                <span className={`inline-flex items-center gap-1 ${stats.currentStreak > 0 ? "text-[var(--status-warning)]" : ""}`}>
                  <Flame className="h-3.5 w-3.5" aria-hidden />
                  {stats.currentStreak}d
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phase breakdown — small multiples, one row per phase, one bar per trader. */}
      <section aria-label="Progress by phase">
        <div className="mb-3 flex items-center gap-2">
          <Target className="h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" strokeWidth={2} aria-hidden />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Progress by phase</h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
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
                {users.map((user) => {
                  const bucket = progressMap.get(user.id)?.phases.find((p) => p.phase === phase.phase);
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
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" strokeWidth={2} aria-hidden />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Win rate &amp; expectancy</h2>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-400"
          >
            Open journal <ArrowRight className="h-3.5 w-3.5" aria-hidden />
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
              {users.map((user) => {
                const t = tradeMap.get(user.id)!;
                const positive = t.total > 0 && t.expectancy > 0;
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
                    <td className="px-4 py-3">
                      {t.total ? (
                        <span
                          className={`inline-flex items-center gap-1 font-medium tabular-nums ${
                            positive ? "text-[var(--status-good)]" : "text-[var(--status-critical)]"
                          }`}
                        >
                          {positive ? (
                            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" aria-hidden />
                          )}
                          {t.expectancy}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
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
