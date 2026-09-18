import Link from "next/link";
import { LayoutDashboard, BookOpen, NotebookText, Compass, LogOut, TrendingUp } from "lucide-react";
import { getCurrentUser } from "@/lib/dal";
import { logout } from "@/lib/actions/auth";
import { seriesVar } from "@/lib/colors";
import { SidebarNavLink, TabBarNavLink } from "./nav-link";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/curriculum", label: "Curriculum", icon: BookOpen },
  { href: "/journal", label: "Journal", icon: NotebookText },
  { href: "/playbook", label: "Playbook", icon: Compass },
];

function Avatar({ name, colorSlot, avatarDataUrl, className = "h-8 w-8 text-sm" }: { name: string; colorSlot: number; avatarDataUrl: string | null; className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold text-white ${className}`}
      style={{ backgroundColor: seriesVar(colorSlot) }}
    >
      {avatarDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- data: URL avatar
        <img src={avatarDataUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        name.slice(0, 1).toUpperCase()
      )}
    </span>
  );
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-full flex-1 bg-zinc-50 dark:bg-black">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-zinc-200 bg-white p-4 md:flex dark:border-zinc-800 dark:bg-zinc-950">
        <Link href="/dashboard" className="flex items-center gap-2 px-2 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <TrendingUp className="h-4.5 w-4.5" strokeWidth={2.4} />
          </span>
          <span className="text-sm font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
            90-Day
            <br />
            Trading Tracker
          </span>
        </Link>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <SidebarNavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="flex flex-col gap-2 border-t border-zinc-200 pt-3 dark:border-zinc-800">
          <Link
            href="/profile"
            className="flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <Avatar name={user.name} colorSlot={user.colorSlot} avatarDataUrl={user.avatarDataUrl} />
            <span className="flex-1 truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">{user.name}</span>
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              <LogOut className="h-4.5 w-4.5" strokeWidth={2} aria-hidden />
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-zinc-200 bg-white/90 px-4 py-2.5 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-950/90">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <TrendingUp className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Trading Tracker</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Avatar name={user.name} colorSlot={user.colorSlot} avatarDataUrl={user.avatarDataUrl} className="h-7 w-7 text-xs" />
          </Link>
          <form action={logout}>
            <button
              type="submit"
              aria-label="Log out"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </form>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex items-stretch gap-1 border-t border-zinc-200 bg-white/95 px-2 py-1.5 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
        {NAV.map((item) => (
          <TabBarNavLink key={item.href} {...item} />
        ))}
      </nav>

      <div className="flex w-full flex-1 flex-col md:pl-60">
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-16 sm:px-6 md:pb-8 md:pt-8">{children}</main>
      </div>
    </div>
  );
}
