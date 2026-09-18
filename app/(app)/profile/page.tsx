import { getCurrentUser } from "@/lib/dal";
import { AvatarForm } from "./avatar-form";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Your profile</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Update your name, username, password and avatar.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Avatar</h2>
        <div className="mt-3">
          <AvatarForm name={user.name} colorSlot={user.colorSlot} avatarDataUrl={user.avatarDataUrl} />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Name &amp; username</h2>
        <div className="mt-3">
          <ProfileForm name={user.name} username={user.username} />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Password</h2>
        <div className="mt-3">
          <PasswordForm />
        </div>
      </section>
    </div>
  );
}
