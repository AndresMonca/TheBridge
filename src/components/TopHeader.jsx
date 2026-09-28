import { Link } from "react-router-dom";
import { focusRing } from "../styles/ui.js";

function TopHeader({
  title = "TheBridge",
  subtitle = "Find your next book connection",
  isDark = false,
  isOnline = true,
  onToggleTheme,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1180px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link
            to="/"
            aria-label="TheBridge home"
            className={`shrink-0 rounded-lg lg:hidden ${focusRing}`}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/brand/thebridge-logo.svg`}
              alt=""
              className="h-7 w-9 object-contain dark:hidden"
            />
            <img
              src={`${import.meta.env.BASE_URL}assets/brand/thebridge-logo-dark.svg`}
              alt=""
              className="hidden h-7 w-9 object-contain dark:block"
            />
          </Link>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{title}</p>

            <p className="hidden truncate text-xs text-ink-muted sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div
            className="flex items-center gap-2 px-2 text-xs font-medium text-ink-muted"
            aria-live="polite"
            title={isOnline ? "Online" : "Offline"}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline ? "bg-[#5E8C69]" : "bg-[#C08A3E]"
              }`}
              aria-hidden="true"
            />

            <span className="sr-only sm:not-sr-only">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink ${focusRing}`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
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
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className={`flex h-10 items-center gap-2 rounded-xl px-1.5 transition-colors hover:bg-surface-muted sm:pr-3 ${focusRing}`}
            aria-label="Open user profile"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-wine-soft text-xs font-bold text-wine-ink">
              A
            </span>

            <span className="hidden text-sm font-semibold text-ink md:inline">
              Member
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
