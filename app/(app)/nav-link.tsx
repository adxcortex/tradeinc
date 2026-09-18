"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, NotebookText, Compass } from "lucide-react";

// Defined here (inside the client boundary) rather than passed in as a prop —
// lucide icon components are function references and can't be serialized
// across a Server -> Client Component boundary, only rendered JSX can.
export const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/curriculum", label: "Curriculum", icon: BookOpen },
  { href: "/journal", label: "Journal", icon: NotebookText },
  { href: "/playbook", label: "Playbook", icon: Compass },
];

function isActivePath(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex flex-1 flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = isActivePath(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            }`}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={2} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function TabBarNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex items-stretch gap-1 border-t border-zinc-200 bg-white/95 px-2 py-1.5 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = isActivePath(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium transition-colors ${
              active ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400 dark:text-zinc-500"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
