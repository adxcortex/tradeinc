# Trading Progress Tracker

A shared web app for 4 traders following the 90-day trading curriculum. Each
person tracks their own progress through every phase/day, keeps personal notes
per topic, logs backtest/paper/live trades, and everyone sees a common team
dashboard (completion %, phase breakdown, streaks, win rate, expectancy).

Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4, MongoDB via
Mongoose, cookie sessions signed with `jose`, no external auth provider.

## 1. Set up MongoDB

Use a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
cluster (or any MongoDB 6+ instance):

1. Create a cluster, then a database user + password.
2. Network access → allow your IP (and `0.0.0.0/0` if deploying to Vercel,
   since Vercel functions run from varying IPs — or use Atlas's "Allow access
   from anywhere" for simplicity, tightened later with Atlas's Vercel
   integration).
3. Copy the connection string (`mongodb+srv://...`).

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:

- `MONGODB_URI` — the Atlas connection string from step 1.
- `SESSION_SECRET` — generate with `openssl rand -base64 32`.

## 3. Install dependencies and seed the 4 accounts

```bash
npm install
npm run seed
```

The seed script creates 4 fixed accounts (`trader1`..`traderfour` by default)
with random passwords printed once to the terminal — copy them somewhere
safe. To set real names/usernames/passwords instead, set
`SEED_USER_1_NAME` / `_USERNAME` / `_PASSWORD` (through `_4_`) in
`.env.local` before running the seed. The script is a no-op if any user
already exists — delete the `users` collection in Atlas to reseed.

## 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), log in with one of the
seeded accounts.

## 5. Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add the same env vars (`MONGODB_URI`, `MONGODB_DB`, `SESSION_SECRET`) as
   Vercel Project → Settings → Environment Variables.
4. Deploy. Run `npm run seed` once locally against the same `MONGODB_URI` (or
   from a one-off Vercel CLI shell) to create the 4 accounts in production.

No further config is needed — this is a standard Next.js app.

## What's in the app

- `/login` — session cookie auth for the 4 fixed accounts.
- `/curriculum` — every phase and day/topic block from the 90-day plan
  (`lib/curriculum.ts`), each with a per-user status (not started / in
  progress / done) and a personal notes field, visible only to that user.
  Teammates' status (not notes) is visible on each item for accountability.
- `/dashboard` — team-wide analytics: per-trader completion %, streaks,
  phase-by-phase progress (small multiples), and trade-journal stats (win
  rate, avg win/loss, expectancy, profit factor) per trader.
- `/journal` — backtest/paper/live trade log (ticker, entry/stop/target,
  setup, R multiple, notes), matching Phase 7 (backtesting) and Phase 8
  (paper trading) of the plan.
- `/playbook` — the parts of the plan that aren't day-specific: the daily
  workflow, the "don't learn this yet" list, the target-correction note, and
  further resources.

## Data model

- `User` — name, username, password hash (bcrypt), a fixed `colorSlot` (1-4)
  used for consistent chart colors.
- `Progress` — one document per (user, curriculum item): status, note,
  completedAt.
- `TradeLog` — one document per logged trade.

Curriculum content itself is static (`lib/curriculum.ts`), not stored in
Mongo — only progress/notes are per-user data.
