"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileFormState } from "@/lib/actions/profile";

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-300";
const labelClass = "text-xs font-medium text-zinc-600 dark:text-zinc-400";

export function ProfileForm({ name, username }: { name: string; username: string }) {
  const [state, action, pending] = useActionState<ProfileFormState, FormData>(updateProfile, undefined);

  return (
    <form action={action} className="flex flex-col gap-3">
      <div>
        <label className={labelClass}>Display name</label>
        <input name="name" defaultValue={name} required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Username</label>
        <input
          name="username"
          defaultValue={username}
          required
          pattern="[a-z0-9_.]{3,20}"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Lowercase letters, numbers, dot or underscore. Used to log in.
        </p>
      </div>
      {state?.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      {state?.success && <p className="text-sm text-[var(--status-good)]">{state.success}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
