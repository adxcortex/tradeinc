"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
import { verifySession } from "@/lib/dal";
import { connectToDatabase } from "@/lib/db";
import { TradeLog, TRADE_KINDS, TRADE_SETUPS, type TradeKind, type TradeSetup } from "@/lib/models/TradeLog";

export type TradeFormState = { error?: string } | undefined;

const TRADE_RESULTS = ["win", "loss", "breakeven", "open"] as const;
type TradeResult = (typeof TRADE_RESULTS)[number];

function num(formData: FormData, key: string) {
  const raw = formData.get(key);
  if (raw === null || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export async function addTrade(_prevState: TradeFormState, formData: FormData): Promise<TradeFormState> {
  const session = await verifySession();

  const ticker = String(formData.get("ticker") || "").trim();
  const date = String(formData.get("date") || "");
  const entry = num(formData, "entry");
  const stop = num(formData, "stop");

  if (!ticker || !date || entry === undefined || stop === undefined) {
    return { error: "Ticker, date, entry and stop are required." };
  }

  const rawKind = String(formData.get("kind") || "paper");
  const rawSetup = String(formData.get("setup") || "other");
  const rawResult = String(formData.get("result") || "open");

  const kind: TradeKind = TRADE_KINDS.includes(rawKind as TradeKind) ? (rawKind as TradeKind) : "paper";
  const setup: TradeSetup = TRADE_SETUPS.includes(rawSetup as TradeSetup) ? (rawSetup as TradeSetup) : "other";
  const result: TradeResult = TRADE_RESULTS.includes(rawResult as TradeResult) ? (rawResult as TradeResult) : "open";

  await connectToDatabase();
  await TradeLog.create({
    userId: session.userId,
    kind,
    setup,
    date: new Date(date),
    ticker,
    entry,
    stop,
    target: num(formData, "target"),
    exit: num(formData, "exit"),
    quantity: num(formData, "quantity"),
    result,
    rMultiple: num(formData, "rMultiple"),
    marketRegime: String(formData.get("marketRegime") || "").trim(),
    reason: String(formData.get("reason") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  });

  revalidatePath("/journal");
  revalidatePath("/dashboard");
}

export async function deleteTrade(id: string) {
  const session = await verifySession();
  await connectToDatabase();
  // mongoose@9's generated filter type rejects a literal ObjectId here; the
  // runtime query is correct, this narrows past a type-generation quirk.
  const filter = { _id: new Types.ObjectId(id), userId: session.userId } as unknown as Parameters<
    typeof TradeLog.deleteOne
  >[0];
  await TradeLog.deleteOne(filter);
  revalidatePath("/journal");
  revalidatePath("/dashboard");
}
