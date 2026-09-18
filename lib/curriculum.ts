// Static content for the 90-day trading curriculum. This never changes at
// runtime — per-user progress and notes live in MongoDB, keyed by `slug`.

export type CurriculumItem = {
  slug: string;
  phase: number;
  dayLabel: string; // e.g. "Day 1" or "Days 8-9"
  dayStart: number;
  dayEnd: number;
  title: string;
  topics: string[];
};

export type Phase = {
  phase: number;
  title: string;
  dayRange: string;
  description: string;
};

export const PHASES: Phase[] = [
  {
    phase: 1,
    title: "Financial-market fundamentals",
    dayRange: "Days 1-7",
    description:
      "How markets, orders, trading styles, Indian market structure, corporate actions and price moves actually work.",
  },
  {
    phase: 2,
    title: "Reading charts",
    dayRange: "Days 8-20",
    description:
      "Candlesticks, timeframes, trend structure, support/resistance, trendlines and full market structure reading.",
  },
  {
    phase: 3,
    title: "Technical indicators",
    dayRange: "Days 21-30",
    description:
      "A small, deliberate toolkit: moving averages, RSI, MACD, VWAP, Bollinger Bands, volume and ATR — used together, not stacked.",
  },
  {
    phase: 4,
    title: "Trading strategies",
    dayRange: "Days 31-45",
    description:
      "Three strategy families: trend continuation, breakout, and mean reversion.",
  },
  {
    phase: 5,
    title: "Risk management",
    dayRange: "Days 46-55",
    description:
      "Risk per trade, position sizing, risk/reward, win rate, expectancy, drawdowns and trading psychology.",
  },
  {
    phase: 6,
    title: "Build your trading system",
    dayRange: "Days 56-65",
    description: "Turn everything so far into a written, rule-based trading playbook.",
  },
  {
    phase: 7,
    title: "Backtesting",
    dayRange: "Days 66-75",
    description:
      "Test the playbook on historical data like an engineer: dataset, metrics, evidence — not vibes.",
  },
  {
    phase: 8,
    title: "Paper trading",
    dayRange: "Days 76-90",
    description:
      "Trade the system with fake money exactly as if it were real, journal everything, analyze in batches.",
  },
  {
    phase: 9,
    title: "Beyond Day 90",
    dayRange: "Months 4-6+",
    description: "First real-money stage, and what to study once the foundation is solid.",
  },
];

export const CURRICULUM: CurriculumItem[] = [
  // ---------- Phase 1: Days 1-7 ----------
  {
    slug: "d01-what-is-the-market",
    phase: 1,
    dayLabel: "Day 1",
    dayStart: 1,
    dayEnd: 1,
    title: "What actually is the stock market?",
    topics: [
      "NSE/BSE",
      "Stocks/equity",
      "Indices",
      "NIFTY/SENSEX",
      "Market capitalization",
      "Shares outstanding",
      "Buyers/sellers",
      "Bid/ask",
      "Liquidity",
      "Volume",
      "Market orders",
      "Limit orders",
    ],
  },
  {
    slug: "d02-how-an-order-works",
    phase: 1,
    dayLabel: "Day 2",
    dayStart: 2,
    dayEnd: 2,
    title: "How an order actually works",
    topics: [
      "Market order",
      "Limit order",
      "Stop-loss order",
      "Stop-limit",
      "Trigger price",
      "Execution price",
      "Slippage",
      "Order book",
      "Goal: explain exactly what happens after clicking BUY",
    ],
  },
  {
    slug: "d03-trading-vs-investing",
    phase: 1,
    dayLabel: "Day 3",
    dayStart: 3,
    dayEnd: 3,
    title: "Trading vs investing",
    topics: [
      "Investing",
      "Swing trading",
      "Positional trading",
      "Intraday trading",
      "Scalping",
      "Eventual focus: swing + intraday, not mastered simultaneously",
    ],
  },
  {
    slug: "d04-indian-market-structure",
    phase: 1,
    dayLabel: "Day 4",
    dayStart: 4,
    dayEnd: 4,
    title: "Indian market structure",
    topics: [
      "Trading sessions",
      "Equity settlement",
      "NSE/BSE",
      "SEBI",
      "Broker",
      "Demat account",
      "Trading account",
      "Charges: STT, exchange transaction charges, GST, stamp duty, SEBI turnover fee",
      "Use a SEBI-registered broker; understand costs and risks before trading",
    ],
  },
  {
    slug: "d05-corporate-actions",
    phase: 1,
    dayLabel: "Day 5",
    dayStart: 5,
    dayEnd: 5,
    title: "Corporate actions",
    topics: ["Dividends", "Bonus", "Stock split", "Rights issue", "Buyback", "Mergers", "Demergers"],
  },
  {
    slug: "d06-why-prices-move",
    phase: 1,
    dayLabel: "Day 6",
    dayStart: 6,
    dayEnd: 6,
    title: "Why prices move",
    topics: [
      "Supply/demand",
      "Earnings",
      "News",
      "Expectations",
      "Institutional buying/selling",
      "Liquidity",
      "Market sentiment",
    ],
  },
  {
    slug: "d07-revision",
    phase: 1,
    dayLabel: "Day 7",
    dayStart: 7,
    dayEnd: 7,
    title: "Revision — Trading Knowledge Base",
    topics: [
      "Write everything learned in Days 1-6 in your own words",
      "Do not copy definitions",
      "This becomes your personal Trading Knowledge Base document",
    ],
  },

  // ---------- Phase 2: Days 8-20 ----------
  {
    slug: "d08-09-candlesticks",
    phase: 2,
    dayLabel: "Days 8-9",
    dayStart: 8,
    dayEnd: 9,
    title: "Candlesticks",
    topics: [
      "Open, High, Low, Close",
      "Body, wick",
      "Bullish candle, bearish candle",
      "Doji",
      "Hammer",
      "Shooting star",
      "Engulfing",
      "Inside bar",
      "Important: candlestick patterns are not magical predictors",
    ],
  },
  {
    slug: "d10-11-timeframes",
    phase: 2,
    dayLabel: "Days 10-11",
    dayStart: 10,
    dayEnd: 11,
    title: "Timeframes",
    topics: [
      "1 minute, 5 minute, 15 minute, 1 hour, 4 hour, daily, weekly",
      "Multi-timeframe analysis (e.g. Daily -> 1H -> 15M)",
      "Higher timeframe gives context, lower timeframe gives entry",
    ],
  },
  {
    slug: "d12-13-trends",
    phase: 2,
    dayLabel: "Days 12-13",
    dayStart: 12,
    dayEnd: 13,
    title: "Trends",
    topics: ["Higher High", "Higher Low", "Lower High", "Lower Low", "Uptrend", "Downtrend", "Range"],
  },
  {
    slug: "d14-15-support-resistance",
    phase: 2,
    dayLabel: "Days 14-15",
    dayStart: 14,
    dayEnd: 15,
    title: "Support & resistance",
    topics: ["Horizontal levels", "Previous highs", "Previous lows", "Breakouts", "Retests", "Failed breakouts"],
  },
  {
    slug: "d16-17-trendlines",
    phase: 2,
    dayLabel: "Days 16-17",
    dayStart: 16,
    dayEnd: 17,
    title: "Trendlines",
    topics: ["Trendline construction", "Trendline breaks", "Channels", "False breaks"],
  },
  {
    slug: "d18-20-market-structure",
    phase: 2,
    dayLabel: "Days 18-20",
    dayStart: 18,
    dayEnd: 20,
    title: "Market structure",
    topics: [
      "Combine candlesticks, timeframes, trends, support/resistance and trendlines",
      "Goal: describe a chart as \"an uptrend, currently pulling back toward previous support\"",
      "Not: \"RSI is 42, MACD crossed, therefore BUY\"",
    ],
  },

  // ---------- Phase 3: Days 21-30 ----------
  {
    slug: "d21-22-moving-averages",
    phase: 3,
    dayLabel: "Days 21-22",
    dayStart: 21,
    dayEnd: 22,
    title: "Moving averages",
    topics: ["SMA", "EMA", "20 EMA", "50 EMA", "200 EMA", "What a moving average actually represents"],
  },
  {
    slug: "d23-rsi",
    phase: 3,
    dayLabel: "Day 23",
    dayStart: 23,
    dayEnd: 23,
    title: "RSI",
    topics: [
      "RSI calculation concept",
      "Overbought / oversold",
      "Divergence",
      "RSI in trends",
      "Don't blindly use RSI < 30 = BUY",
    ],
  },
  {
    slug: "d24-macd",
    phase: 3,
    dayLabel: "Day 24",
    dayStart: 24,
    dayEnd: 24,
    title: "MACD",
    topics: ["MACD line", "Signal line", "Histogram", "Crossovers", "Momentum"],
  },
  {
    slug: "d25-vwap",
    phase: 3,
    dayLabel: "Day 25",
    dayStart: 25,
    dayEnd: 25,
    title: "VWAP",
    topics: ["VWAP", "Price vs VWAP", "VWAP rejection", "VWAP reclaim", "Especially important for intraday"],
  },
  {
    slug: "d26-bollinger-bands",
    phase: 3,
    dayLabel: "Day 26",
    dayStart: 26,
    dayEnd: 26,
    title: "Bollinger Bands",
    topics: ["Moving average basis", "Standard deviation", "Volatility", "Expansion", "Contraction"],
  },
  {
    slug: "d27-volume",
    phase: 3,
    dayLabel: "Day 27",
    dayStart: 27,
    dayEnd: 27,
    title: "Volume",
    topics: [
      "Volume spikes",
      "Volume confirmation",
      "Breakout + volume",
      "Low-volume breakouts",
      "Volume exhaustion",
      "More important than beginners realize",
    ],
  },
  {
    slug: "d28-atr",
    phase: 3,
    dayLabel: "Day 28",
    dayStart: 28,
    dayEnd: 28,
    title: "ATR (Average True Range)",
    topics: ["ATR concept", "Stop-loss placement using ATR", "Volatility measurement", "Position sizing"],
  },
  {
    slug: "d29-indicators-together",
    phase: 3,
    dayLabel: "Day 29",
    dayStart: 29,
    dayEnd: 29,
    title: "Indicators together",
    topics: [
      "Build small combinations, e.g. price structure + EMA + volume",
      "Not: RSI + MACD + Bollinger + Stochastic + CCI + Supertrend + Fibonacci + everything else",
    ],
  },
  {
    slug: "d30-indicator-revision",
    phase: 3,
    dayLabel: "Day 30",
    dayStart: 30,
    dayEnd: 30,
    title: "Indicator revision",
    topics: [
      "Price action -> structure",
      "Volume -> participation",
      "EMA -> trend",
      "RSI -> momentum",
      "VWAP -> intraday reference",
      "ATR -> volatility",
    ],
  },

  // ---------- Phase 4: Days 31-45 ----------
  {
    slug: "d31-36-trend-continuation",
    phase: 4,
    dayLabel: "Days 31-36",
    dayStart: 31,
    dayEnd: 36,
    title: "Strategy 1 — Trend continuation",
    topics: [
      "Sequence: uptrend -> pullback -> support/EMA -> bullish confirmation -> entry -> stop below structure -> target",
      "Pullbacks",
      "Breakouts",
      "Retests",
      "Continuation patterns",
    ],
  },
  {
    slug: "d37-41-breakout",
    phase: 4,
    dayLabel: "Days 37-41",
    dayStart: 37,
    dayEnd: 41,
    title: "Strategy 2 — Breakout",
    topics: [
      "Sequence: resistance -> consolidation -> volume expansion -> breakout -> retest -> continuation",
      "Range breakout",
      "Volume breakout",
      "Failed breakout",
      "Breakout retest",
    ],
  },
  {
    slug: "d42-45-mean-reversion",
    phase: 4,
    dayLabel: "Days 42-45",
    dayStart: 42,
    dayEnd: 45,
    title: "Strategy 3 — Mean reversion",
    topics: [
      "Extended price",
      "Range markets",
      "Reversion to mean",
      "Bollinger Bands",
      "RSI",
      "VWAP",
      "Do not trade this until market regimes are understood",
    ],
  },

  // ---------- Phase 5: Days 46-55 ----------
  {
    slug: "d46-risk-per-trade",
    phase: 5,
    dayLabel: "Day 46",
    dayStart: 46,
    dayEnd: 46,
    title: "Risk per trade",
    topics: [
      "Start with 0.5%-1% account risk per trade",
      "Example: capital 1,00,000 x 1% risk = max loss 1,000",
      "Think in terms of \"willing to lose\", not \"buying worth\"",
    ],
  },
  {
    slug: "d47-position-sizing",
    phase: 5,
    dayLabel: "Day 47",
    dayStart: 47,
    dayEnd: 47,
    title: "Position sizing",
    topics: [
      "Formula: Position Size = Max Risk / (Entry - Stop Loss)",
      "Example: entry 500, stop 490, risk/share 10, account risk 1,000 -> 100 shares",
    ],
  },
  {
    slug: "d48-risk-reward",
    phase: 5,
    dayLabel: "Day 48",
    dayStart: 48,
    dayEnd: 48,
    title: "Risk/reward",
    topics: ["1:1, 1:2, 1:3 ratios", "Example: risk 1,000, potential profit 2,000 = 1:2 R:R"],
  },
  {
    slug: "d49-win-rate",
    phase: 5,
    dayLabel: "Day 49",
    dayStart: 49,
    dayEnd: 49,
    title: "Win rate",
    topics: [
      "A 70% win rate is not required",
      "Example: 40% win rate, avg win 2,000, avg loss 1,000, 100 trades -> net +20,000 before costs/taxes",
    ],
  },
  {
    slug: "d50-expectancy",
    phase: 5,
    dayLabel: "Day 50",
    dayStart: 50,
    dayEnd: 50,
    title: "Expectancy",
    topics: [
      "Formula: Expectancy = (Win prob x Avg win) - (Loss prob x Avg loss)",
      "Example: 0.45 x 2,000 - 0.55 x 1,000 = 350/trade",
      "More meaningful than \"this strategy feels accurate\"",
    ],
  },
  {
    slug: "d51-52-drawdowns",
    phase: 5,
    dayLabel: "Days 51-52",
    dayStart: 51,
    dayEnd: 52,
    title: "Drawdowns",
    topics: [
      "Losing streaks",
      "Maximum drawdown",
      "Recovery math",
      "A 50% loss requires a 100% gain to recover -> don't blow up",
    ],
  },
  {
    slug: "d53-55-psychology",
    phase: 5,
    dayLabel: "Days 53-55",
    dayStart: 53,
    dayEnd: 55,
    title: "Psychology",
    topics: [
      "FOMO",
      "Revenge trading",
      "Overtrading",
      "Fear",
      "Greed",
      "Loss aversion",
      "Confirmation bias",
      "Recency bias",
      "Anchoring",
      "Sunk cost",
      "\"I lost 1,500, I'll make it back on this next trade\" — never do that",
    ],
  },

  // ---------- Phase 6: Days 56-65 ----------
  {
    slug: "d56-65-trading-playbook",
    phase: 6,
    dayLabel: "Days 56-65",
    dayStart: 56,
    dayEnd: 65,
    title: "Build your Trading Playbook",
    topics: [
      "For every setup, define: Market (what you trade, e.g. NSE liquid large-cap equities)",
      "Timeframe (e.g. Daily + 1H)",
      "Setup (e.g. trend pullback)",
      "Entry — exactly what must happen",
      "Stop — exactly where you are wrong",
      "Target — how profit is taken",
      "Position size — formula-based",
      "Maximum trades/day (e.g. 1)",
      "Maximum daily loss (e.g. 1R)",
      "Maximum weekly loss (e.g. 3R)",
      "This turns trading into a system",
    ],
  },

  // ---------- Phase 7: Days 66-75 ----------
  {
    slug: "d66-75-backtest-dataset",
    phase: 7,
    dayLabel: "Days 66-75",
    dayStart: 66,
    dayEnd: 70,
    title: "Backtesting — build the dataset",
    topics: [
      "Do not put real money in yet — test the strategy on historical data first",
      "Collect per trade: date, ticker, setup, entry, stop, target, result, R multiple, market regime, screenshot, reason for entry",
      "Aim for at least 100 historical trades, preferably 200-300, before drawing conclusions",
      "Suggested repo layout: strategy.md, trades.csv, backtest.py, analysis.py, screenshots/, journal/, reports/",
    ],
  },
  {
    slug: "d71-75-backtest-metrics",
    phase: 7,
    dayLabel: "Days 71-75",
    dayStart: 71,
    dayEnd: 75,
    title: "Backtesting — calculate the metrics",
    topics: [
      "Win rate",
      "Average win",
      "Average loss",
      "Expectancy",
      "Profit factor",
      "Max drawdown",
      "Sharpe-like measure",
      "Consecutive losses",
      "Average holding time",
      "Setup performance",
      "Market-regime performance",
      "Approach trading like an engineer, not a gambler",
    ],
  },

  // ---------- Phase 8: Days 76-90 ----------
  {
    slug: "d76-90-paper-trading",
    phase: 8,
    dayLabel: "Days 76-90",
    dayStart: 76,
    dayEnd: 90,
    title: "Paper trading",
    topics: [
      "Trade the system without real money — but exactly as if money were involved",
      "Record every trade",
      "Analyze after 30 trades",
      "Analyze after 50 trades",
      "Analyze after 100 trades",
    ],
  },

  // ---------- Phase 9: Beyond Day 90 ----------
  {
    slug: "m4-live-stage-1",
    phase: 9,
    dayLabel: "Month 4",
    dayStart: 91,
    dayEnd: 120,
    title: "First live-trading stage",
    topics: [
      "Do not suddenly deploy full capital",
      "Stage 1: 5,000-10,000 experimental capital",
      "Risk roughly 50-100/trade depending on instrument/liquidity and account size",
      "Objective is NOT income — it's proving you can follow your system with real money on the line",
    ],
  },
  {
    slug: "m4-6-daily-workflow",
    phase: 9,
    dayLabel: "Months 4-6",
    dayStart: 91,
    dayEnd: 180,
    title: "1 trade/day workflow and target correction",
    topics: [
      "1 trade/day maximum — but that does NOT mean you must trade every day",
      "No setup = zero trades = a valid trading day",
      "Workflow: 07:30 market/news prep -> 08:30 watchlist -> 09:15 market opens -> wait -> setup? no: do nothing / yes: calculate risk -> place trade -> stop/target -> exit -> journal",
      "Target correction: not \"I want X every day\", but \"positive expectancy over 100+ trades while keeping drawdown controlled\"",
      "Green every day is not the goal; positive expected value over a sufficiently large sample is",
    ],
  },
  {
    slug: "later-what-to-learn-next",
    phase: 9,
    dayLabel: "After Day 90",
    dayStart: 91,
    dayEnd: 181,
    title: "What to learn next",
    topics: [
      "Technical: advanced price action, market structure, volume profile, VWAP, ATR, relative strength, sector rotation, market breadth, volatility",
      "Fundamental: revenue, EBITDA, EPS, P/E, P/B, ROE, ROCE, debt, cash flow, earnings growth, promoter holding, institutional ownership",
      "Quantitative: probability, expected value, distribution, standard deviation, correlation, regression, backtesting, Monte Carlo simulation, position sizing, portfolio risk",
      "Automate the boring stuff: NSE data -> Python -> scanner -> candidate stocks -> technical filters -> setup -> risk calculator -> alert -> you make the final decision",
    ],
  },
];

export const TOTAL_DAYS = 90;

export const DONT_LEARN_FIRST = [
  "Options Greeks",
  "Complex options strategies",
  "0DTE-style expiry gambling",
  "Futures leverage",
  "50 indicators",
  "Elliott Wave (deeply)",
  "Harmonic patterns",
  "20 different trading systems",
  "Telegram/WhatsApp tips",
  "\"90% accuracy\" strategies",
  "Paid signal groups",
  "Copy trading",
];

export const RESOURCES = [
  { name: "NSE Investor Education", note: "Candlesticks, support/resistance, indicators, strategies, risk management." },
  { name: "SEBI Research & Investor Resources", note: "FY25-26 research on derivatives-trader risk and profitability." },
  { name: "NSE advanced technical-analysis curriculum", note: "Scanners, price action, volume, open interest, Fibonacci, sentiment indicators, index trading." },
];

export function curriculumBySlug(slug: string): CurriculumItem | undefined {
  return CURRICULUM.find((c) => c.slug === slug);
}

export function curriculumByPhase(phase: number): CurriculumItem[] {
  return CURRICULUM.filter((c) => c.phase === phase);
}
