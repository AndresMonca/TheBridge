import { Link } from "react-router-dom";
import { focusRing } from "../styles/ui.js";
import SidebarNavigation from "./navigation/SidebarNavigation.jsx";
import SidebarToggleIcon from "./navigation/SidebarToggleIcon.jsx";

const toggleClass = `grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-subtle transition-colors hover:bg-surface-muted hover:text-ink ${focusRing}`;

function Sidebar({ collapsed = false, onToggle }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-line bg-chrome py-6 transition-all duration-200 lg:flex ${
        collapsed ? "w-20 px-3" : "w-64 px-4"
      }`}
      aria-label="Primary navigation"
    >
      <div className="flex h-12 items-center justify-between gap-2 px-2">
        <Link
          to="/"
          className={`flex min-w-0 items-center gap-2.5 rounded-lg ${focusRing}`}
          aria-label="TheBridge home"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/brand/thebridge-logo.svg`}
            alt="TheBridge logo: two people forming a bridge above an open book"
            className="h-9 w-11 shrink-0 object-contain dark:hidden"
          />
          <img
            src={`${import.meta.env.BASE_URL}assets/brand/thebridge-logo-dark.svg`}
            alt="TheBridge logo: two people forming a bridge above an open book"
            className="hidden h-9 w-11 shrink-0 object-contain dark:block"
          />

          {!collapsed && (
            <span className="truncate text-lg font-bold tracking-tight text-ink">
              TheBridge
            </span>
          )}
        </Link>

        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            className={toggleClass}
            aria-label="Collapse sidebar"
            aria-expanded="true"
          >
            <SidebarToggleIcon expanded />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={onToggle}
          className={`mx-auto mt-3 ${toggleClass}`}
          aria-label="Expand sidebar"
          aria-expanded="false"
        >
          <SidebarToggleIcon expanded={false} />
        </button>
      )}

      <SidebarNavigation collapsed={collapsed} />

      {!collapsed && (
        <p className="border-t border-line px-2 pt-5 text-xs leading-5 text-ink-muted">
          A community for books in motion.
        </p>
      )}
    </aside>
  );
}

export default Sidebar;
