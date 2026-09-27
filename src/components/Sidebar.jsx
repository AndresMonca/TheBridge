import { Link } from "react-router-dom";
import SidebarNavigation from "./navigation/SidebarNavigation.jsx";

function ToggleIcon({ expanded }) {
  return (
    <svg
      className={`h-5 w-5 ${expanded ? "" : "rotate-180"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M14 8l-4 4 4 4" />
    </svg>
  );
}

function Sidebar({ collapsed = false, onToggle }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-slate-200 bg-white/95 px-3 py-4 backdrop-blur transition-all duration-200 dark:border-slate-800 dark:bg-slate-950/95 lg:flex ${
        collapsed ? "w-20" : "w-64"
      }`}
      aria-label="Primary navigation"
    >
      <div className="flex h-14 items-center justify-between gap-2 px-2">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          aria-label="TheBridge home"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/brand/thebridge-logo.svg`}
            alt="TheBridge logo: two people forming a bridge above an open book"
            className="h-10 w-12 shrink-0 object-contain"
          />

          {!collapsed && (
            <span className="truncate text-lg font-black tracking-tight">
              TheBridge
            </span>
          )}
        </Link>

        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:hover:bg-slate-900 dark:hover:text-white"
            aria-label="Collapse sidebar"
            aria-expanded="true"
          >
            <ToggleIcon expanded />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={onToggle}
          className="mx-auto mt-2 grid h-9 w-9 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:hover:bg-slate-900 dark:hover:text-white"
          aria-label="Expand sidebar"
          aria-expanded="false"
        >
          <ToggleIcon expanded={false} />
        </button>
      )}

      <SidebarNavigation collapsed={collapsed} />

      {!collapsed && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          A focused student book marketplace.
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
