import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { logout } from "@/lib/actions/auth";
import { seriesVar } from "@/lib/colors";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/journal", label: "Trade journal" },
  { href: "/playbook", label: "Playbook & resources" },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              90-Day Trading Tracker
            </Link>
            <nav className="flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-md px-1.5 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              title="Edit profile"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: seriesVar(user.colorSlot) }}
              >
                {user.avatarDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- data: URL avatar
                  <img src={user.avatarDataUrl} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  user.name.slice(0, 1).toUpperCase()
                )}
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{user.name}</span>
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
