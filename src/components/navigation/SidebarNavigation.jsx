import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "../../data/navigation.js";
import NavIcon from "./NavIcon.jsx";

function SidebarNavigation({ collapsed }) {
  const location = useLocation();

  const isCurrentRoute = (item) => {
    if (item.id === "listing") {
      return location.pathname.startsWith("/listing/");
    }

    if (item.path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === item.path;
  };

  return (
    <nav className="mt-6 flex-1 overflow-y-auto" aria-label="TheBridge sections">
      <ul className="space-y-1.5">
        {navigationItems.map((item) => {
          const isActive = isCurrentRoute(item);

          return (
            <li key={item.id}>
              <Link
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                className={`flex items-center rounded-2xl px-3 py-3 text-sm transition focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  collapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold text-white shadow-lg shadow-indigo-500/15"
                    : "font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                }`}
              >
                <NavIcon name={item.icon} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SidebarNavigation;
