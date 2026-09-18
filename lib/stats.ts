import "server-only";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Progress, type ProgressStatus } from "@/lib/models/Progress";
import { TradeLog } from "@/lib/models/TradeLog";
import { CURRICULUM, PHASES } from "@/lib/curriculum";

export type UserSummary = { id: string; name: string; username: string; colorSlot: number };

export async function getAllUsers(): Promise<UserSummary[]> {
  await connectToDatabase();
  const users = await User.find().select("_id name username colorSlot").sort({ colorSlot: 1 }).lean();
  return users.map((u) => ({ id: String(u._id), name: u.name, username: u.username, colorSlot: u.colorSlot }));
}

export type PhaseBreakdown = { phase: number; title: string; total: number; done: number; inProgress: number };

export type UserProgressStats = {
  userId: string;
  totalItems: number;
  done: number;
  inProgress: number;
  notStarted: number;
  percentDone: number;
  currentStreak: number;
  lastActivityAt: Date | null;
  phases: PhaseBreakdown[];
};

function computeStreak(completedDates: Date[]): number {
  if (completedDates.length === 0) return 0;
  const days = new Set(completedDates.map((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()));
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  // A streak counts back from today (or yesterday, if nothing logged today yet).
  if (!days.has(cursor.getTime())) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(cursor.getTime())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function summarizeProgress(userId: string, records: { slug: string; status?: string; completedAt?: Date | null }[]): UserProgressStats {
  const bySlug = new Map(records.map((r) => [r.slug, r]));

  let done = 0;
  let inProgress = 0;
  const phaseMap = new Map<number, PhaseBreakdown>();
  for (const phase of PHASES) {
    phaseMap.set(phase.phase, { phase: phase.phase, title: phase.title, total: 0, done: 0, inProgress: 0 });
  }

  for (const item of CURRICULUM) {
    const record = bySlug.get(item.slug);
    const status: ProgressStatus = (record?.status as ProgressStatus) || "not_started";
    const bucket = phaseMap.get(item.phase)!;
    bucket.total += 1;
    if (status === "done") {
      done += 1;
      bucket.done += 1;
    } else if (status === "in_progress") {
      inProgress += 1;
      bucket.inProgress += 1;
    }
  }

  const completedDates = records.filter((r) => r.completedAt).map((r) => new Date(r.completedAt as Date));
  const lastActivityAt = completedDates.length
    ? new Date(Math.max(...completedDates.map((d) => d.getTime())))
    : null;

  const totalItems = CURRICULUM.length;
  return {
    userId,
    totalItems,
    done,
    inProgress,
    notStarted: totalItems - done - inProgress,
    percentDone: totalItems ? Math.round((done / totalItems) * 100) : 0,
    currentStreak: computeStreak(completedDates),
    lastActivityAt,
    phases: Array.from(phaseMap.values()),
  };
}

/** One query for every user's progress, instead of one query per user. */
export async function getAllProgressStats(userIds: string[]): Promise<Map<string, UserProgressStats>> {
  await connectToDatabase();
  const records = await Progress.find({ userId: { $in: userIds } })
    .select("userId slug status completedAt")
    .lean();

  const byUser = new Map<string, typeof records>();
  for (const id of userIds) byUser.set(id, []);
  for (const r of records) {
    const key = String(r.userId);
    byUser.get(key)?.push(r);
  }

  const result = new Map<string, UserProgressStats>();
  for (const id of userIds) {
    result.set(id, summarizeProgress(id, byUser.get(id) || []));
  }
  return result;
}

export async function getUserProgressStats(userId: string): Promise<UserProgressStats> {
  const map = await getAllProgressStats([userId]);
  return map.get(userId)!;
}

export type TradeStats = {
  userId: string;
  total: number;
  wins: number;
  losses: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  expectancy: number;
  profitFactor: number | null;
};

function summarizeTrades(userId: string, trades: { result: string; rMultiple?: number | null }[]): TradeStats {
  const wins = trades.filter((t) => t.result === "win");
  const losses = trades.filter((t) => t.result === "loss");

  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const winRs = wins.map((t) => Math.abs(t.rMultiple ?? 0)).filter((n) => n > 0);
  const lossRs = losses.map((t) => Math.abs(t.rMultiple ?? 0)).filter((n) => n > 0);

  const avgWin = avg(winRs);
  const avgLoss = avg(lossRs);
  const total = trades.length;
  const winRate = total ? wins.length / total : 0;
  const expectancy = winRate * avgWin - (1 - winRate) * avgLoss;
  const grossWin = winRs.reduce((a, b) => a + b, 0);
  const grossLoss = lossRs.reduce((a, b) => a + b, 0);

  return {
    userId,
    total,
    wins: wins.length,
    losses: losses.length,
    winRate: Math.round(winRate * 1000) / 10,
    avgWin: Math.round(avgWin * 100) / 100,
    avgLoss: Math.round(avgLoss * 100) / 100,
    expectancy: Math.round(expectancy * 100) / 100,
    profitFactor: grossLoss > 0 ? Math.round((grossWin / grossLoss) * 100) / 100 : null,
  };
}

/** One query for every user's trades, instead of one query per user. */
export async function getAllTradeStats(userIds: string[]): Promise<Map<string, TradeStats>> {
  await connectToDatabase();
  const trades = await TradeLog.find({ userId: { $in: userIds }, result: { $in: ["win", "loss"] } })
    .select("userId result rMultiple")
    .lean();

  const byUser = new Map<string, typeof trades>();
  for (const id of userIds) byUser.set(id, []);
  for (const t of trades) {
    const key = String(t.userId);
    byUser.get(key)?.push(t);
  }

  const result = new Map<string, TradeStats>();
  for (const id of userIds) {
    result.set(id, summarizeTrades(id, byUser.get(id) || []));
  }
  return result;
}

export async function getUserTradeStats(userId: string): Promise<TradeStats> {
  const map = await getAllTradeStats([userId]);
  return map.get(userId)!;
}

export { CURRICULUM, PHASES };
