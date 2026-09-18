import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Trading Progress Tracker</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          90-day trading curriculum &middot; 4 traders &middot; shared dashboard.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
