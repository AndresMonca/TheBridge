function TopHeader({
  title = "TheBridge",
  subtitle = "Find your next book connection",
  isDark = false,
  isOnline = true,
  onToggleTheme,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-slate-950 dark:text-white sm:text-base">
            {title}
          </p>

          <p className="hidden truncate text-xs font-semibold text-slate-500 dark:text-slate-400 sm:block">
            {subtitle}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-2 text-[10px] font-bold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:gap-2 sm:px-3 sm:text-xs"
            aria-live="polite"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isOnline ? "bg-emerald-500" : "bg-amber-500"
              }`}
              aria-hidden="true"
            />

            <span>{isOnline ? "Online" : "Offline"}</span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 sm:px-3"
            aria-label="Open user profile"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-black text-white">
              A
            </span>

            <span className="hidden text-sm font-extrabold text-slate-700 dark:text-slate-200 md:inline">
              Student
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
