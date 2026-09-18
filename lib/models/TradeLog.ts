import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

export const TRADE_KINDS = ["backtest", "paper", "live"] as const;
export type TradeKind = (typeof TRADE_KINDS)[number];

export const TRADE_SETUPS = ["trend_continuation", "breakout", "mean_reversion", "other"] as const;
export type TradeSetup = (typeof TRADE_SETUPS)[number];

const TradeLogSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    kind: { type: String, enum: TRADE_KINDS, required: true, default: "paper" },
    date: { type: Date, required: true },
    ticker: { type: String, required: true, trim: true, uppercase: true },
    setup: { type: String, enum: TRADE_SETUPS, default: "other" },
    entry: { type: Number, required: true },
    stop: { type: Number, required: true },
    target: { type: Number },
    exit: { type: Number },
    quantity: { type: Number },
    result: { type: String, enum: ["win", "loss", "breakeven", "open"], default: "open" },
    rMultiple: { type: Number },
    marketRegime: { type: String, trim: true },
    reason: { type: String, trim: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

TradeLogSchema.index({ userId: 1, date: -1 });

export type TradeLogDoc = InferSchemaType<typeof TradeLogSchema> & { _id: Schema.Types.ObjectId };

export const TradeLog: Model<TradeLogDoc> = models.TradeLog || model<TradeLogDoc>("TradeLog", TradeLogSchema);
