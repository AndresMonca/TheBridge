import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "../data/navigation.js";
import NavIcon from "./navigation/NavIcon.jsx";

const mobileIds = ["home", "marketplace", "my-books", "requests", "about"];

const mobileItems = navigationItems.filter((item) =>
  mobileIds.includes(item.id),
);

function BottomNavigation() {
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-5 gap-1">
        {mobileItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname === item.path;

          return (
            <li key={item.id}>
              <Link
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] font-bold transition focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                }`}
              >
                <NavIcon name={item.icon} />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
