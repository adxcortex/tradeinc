import { ImageIcon, UserRound, KeyRound } from "lucide-react";
import { getCurrentUser } from "@/lib/dal";
import { AvatarForm } from "./avatar-form";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";

export const dynamic = "force-dynamic";

function SectionHeading({ icon: Icon, children }: { icon: typeof ImageIcon; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
      <Icon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden />
      {children}
    </h2>
  );
}

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
        <SectionHeading icon={ImageIcon}>Avatar</SectionHeading>
        <div className="mt-3">
          <AvatarForm name={user.name} colorSlot={user.colorSlot} avatarDataUrl={user.avatarDataUrl} />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <SectionHeading icon={UserRound}>Name &amp; username</SectionHeading>
        <div className="mt-3">
          <ProfileForm name={user.name} username={user.username} />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <SectionHeading icon={KeyRound}>Password</SectionHeading>
        <div className="mt-3">
          <PasswordForm />
        </div>
      </section>
    </div>
  );
}
