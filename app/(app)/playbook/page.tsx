import { Clock3, Target, XCircle, GraduationCap, BookMarked, X } from "lucide-react";
import { DONT_LEARN_FIRST, RESOURCES } from "@/lib/curriculum";

function SectionHeading({ icon: Icon, children }: { icon: typeof Clock3; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
      <Icon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden />
      {children}
    </h2>
  );
}

export default function PlaybookPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Playbook &amp; resources</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Reference material that doesn&apos;t belong to a single day — keep it in view for the whole 90 days.
        </p>
      </div>

      <section>
        <SectionHeading icon={Clock3}>Daily workflow (Months 4+)</SectionHeading>
        <ol className="mt-2 flex flex-col gap-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>07:30 — Market/news preparation</li>
          <li>08:30 — Watchlist</li>
          <li>09:15 — Market opens, wait for a setup</li>
          <li>No setup appears -&gt; do nothing. That is a valid trading day.</li>
          <li>Setup appears -&gt; calculate risk -&gt; place trade -&gt; set stop/target -&gt; exit -&gt; journal it</li>
        </ol>
      </section>

      <section>
        <SectionHeading icon={Target}>Target correction</SectionHeading>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Don&apos;t aim for &ldquo;I want ₹X every day.&rdquo; Aim for &ldquo;positive expectancy over 100+ trades
          while keeping drawdown controlled.&rdquo; Markets don&apos;t pay a salary every day — the goal is positive
          expected value over a sufficiently large sample, not green every single day.
        </p>
      </section>

      <section>
        <SectionHeading icon={XCircle}>Don&apos;t learn this in the first 90 days</SectionHeading>
        <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {DONT_LEARN_FIRST.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <X className="h-3.5 w-3.5 shrink-0 text-[var(--status-critical)]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Especially avoid starting with F&amp;O simply because it looks like the fastest route to daily income —
          SEBI&apos;s research tracks poor profitability among individual derivatives traders, and leverage
          magnifies losses.
        </p>
      </section>

      <section>
        <SectionHeading icon={GraduationCap}>What to learn once the foundation is solid</SectionHeading>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          See the &ldquo;What to learn next&rdquo; item in Phase 9 of the curriculum for the full technical,
          fundamental and quantitative reading list, plus the automation idea (NSE data -&gt; Python -&gt; scanner
          -&gt; candidate stocks -&gt; technical filters -&gt; setup -&gt; risk calculator -&gt; alert -&gt; you decide).
        </p>
      </section>

      <section>
        <SectionHeading icon={BookMarked}>Recommended starting resources</SectionHeading>
        <ul className="mt-2 flex flex-col gap-2">
          {RESOURCES.map((r) => (
            <li key={r.name} className="rounded-xl border border-zinc-200 p-3 text-sm dark:border-zinc-800">
              <span className="font-medium text-zinc-900 dark:text-zinc-50">{r.name}</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">{r.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
