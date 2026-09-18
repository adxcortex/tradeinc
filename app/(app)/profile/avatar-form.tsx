"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import { updateAvatar, removeAvatar, type ProfileFormState } from "@/lib/actions/profile";
import { seriesVar } from "@/lib/colors";

export function AvatarForm({
  name,
  colorSlot,
  avatarDataUrl,
}: {
  name: string;
  colorSlot: number;
  avatarDataUrl: string | null;
}) {
  const [state, action, pending] = useActionState<ProfileFormState, FormData>(updateAvatar, undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [isRemoving, startRemove] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const shown = preview ?? avatarDataUrl;

  return (
    <div className="flex items-center gap-5">
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full text-xl font-semibold text-white"
        style={{ backgroundColor: seriesVar(colorSlot) }}
      >
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element -- data: URLs aren't optimizable by next/image
          <img src={shown} alt={name} className="h-full w-full object-cover" />
        ) : (
          name.slice(0, 1).toUpperCase()
        )}
      </div>

      <form
        action={action}
        className="flex flex-col gap-2"
        onSubmit={() => {
          // Keep the picked preview until the server confirms or errors.
        }}
      >
        <input
          ref={inputRef}
          type="file"
          name="avatar"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return setPreview(null);
            const reader = new FileReader();
            reader.onload = () => setPreview(String(reader.result));
            reader.readAsDataURL(file);
          }}
          className="text-xs text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-zinc-700 dark:text-zinc-400 dark:file:bg-zinc-100 dark:file:text-zinc-900 dark:hover:file:bg-white"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="w-fit rounded-lg border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {pending ? "Uploading..." : "Upload"}
          </button>
          {avatarDataUrl && (
            <button
              type="button"
              disabled={isRemoving}
              onClick={() => {
                setPreview(null);
                if (inputRef.current) inputRef.current.value = "";
                startRemove(() => removeAvatar());
              }}
              className="text-xs text-zinc-400 hover:text-red-600 disabled:opacity-60 dark:hover:text-red-400"
            >
              Remove
            </button>
          )}
        </div>
        {state?.error && <p className="text-xs text-red-600 dark:text-red-400">{state.error}</p>}
        {state?.success && <p className="text-xs text-[var(--status-good)]">{state.success}</p>}
        <p className="text-xs text-zinc-500 dark:text-zinc-400">PNG, JPEG, WEBP or GIF, up to 1.5MB.</p>
      </form>
    </div>
  );
}
