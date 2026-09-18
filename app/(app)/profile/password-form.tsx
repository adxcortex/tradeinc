"use client";

import { useActionState } from "react";
import { changePassword, type ProfileFormState } from "@/lib/actions/profile";

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-300";
const labelClass = "text-xs font-medium text-zinc-600 dark:text-zinc-400";

export function PasswordForm() {
  const [state, action, pending] = useActionState<ProfileFormState, FormData>(changePassword, undefined);

  return (
    <form action={action} key={state?.success ? "reset" : "form"} className="flex flex-col gap-3">
      <div>
        <label className={labelClass}>Current password</label>
        <input type="password" name="currentPassword" autoComplete="current-password" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>New password</label>
        <input
          type="password"
          name="newPassword"
          autoComplete="new-password"
          minLength={8}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Confirm new password</label>
        <input
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          minLength={8}
          required
          className={inputClass}
        />
      </div>
      {state?.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      {state?.success && <p className="text-sm text-[var(--status-good)]">{state.success}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        {pending ? "Changing..." : "Change password"}
      </button>
    </form>
  );
}
