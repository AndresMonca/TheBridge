const navigationItems = [
  { id: "home", label: "Home", href: "./", icon: "home" },
  { id: "marketplace", label: "Marketplace", href: "marketplace.html", icon: "marketplace" },
  { id: "my-books", label: "My Books", href: "my-books.html", icon: "books" },
  { id: "add-book", label: "Add Book", href: "add-book.html", icon: "add" },
  { id: "create-listing", label: "Create Listing", href: "create-listing.html", icon: "edit" },
  { id: "listing", label: "Listing Details", href: "listing.html", icon: "listing" },
  { id: "requests", label: "Requests", href: "requests.html", icon: "requests" },
  { id: "about", label: "About", href: "about.html", icon: "about" },
];

function NavIcon({ name }) {
  const commonProps = {
    className: "h-5 w-5 shrink-0",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...commonProps}>
          <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
        </svg>
      );

    case "marketplace":
      return (
        <svg {...commonProps}>
          <path d="M4 7h16M5 7l1-3h12l1 3M5 7v13h14V7M9 11h6M9 15h6" />
        </svg>
      );

    case "books":
      return (
        <svg {...commonProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5Z" />
          <path d="M4 6.5v13" />
        </svg>
      );

    case "add":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );

    case "edit":
      return (
        <svg {...commonProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );

    case "listing":
      return (
        <svg {...commonProps}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );

    case "requests":
      return (
        <svg {...commonProps}>
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6M12 7h.01" />
        </svg>
      );
  }
}

function Sidebar({ activePage = "home", collapsed = false, onToggle }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-slate-200 bg-white/95 px-3 py-4 backdrop-blur transition-all duration-200 dark:border-slate-800 dark:bg-slate-950/95 lg:flex ${
        collapsed ? "w-20" : "w-64"
      }`}
      aria-label="Primary navigation"
    >
      <div className="flex h-14 items-center justify-between gap-2 px-2">
        <a
          href="./"
          className="flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          aria-label="TheBridge home"
        >
          <img
            src="/assets/brand/thebridge-logo.svg"
            alt="TheBridge logo: two people forming a bridge above an open book"
            className="h-10 w-12 shrink-0 object-contain"
          />

          {!collapsed && (
            <span className="truncate text-lg font-black tracking-tight">
              TheBridge
            </span>
          )}
        </a>

        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:hover:bg-slate-900 dark:hover:text-white"
            aria-label="Collapse sidebar"
            aria-expanded={!collapsed}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M14 8l-4 4 4 4" />
            </svg>
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={onToggle}
          className="mx-auto mt-2 grid h-9 w-9 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:hover:bg-slate-900 dark:hover:text-white"
          aria-label="Expand sidebar"
          aria-expanded={!collapsed}
        >
          <svg
            className="h-5 w-5 rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M14 8l-4 4 4 4" />
          </svg>
        </button>
      )}

      <nav className="mt-6 flex-1 overflow-y-auto" aria-label="TheBridge sections">
        <ul className="space-y-1.5">
          {navigationItems.map((item) => {
            const isActive = activePage === item.id;

            return (
              <li key={item.id}>
                <a
                  href={item.href}
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
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          A focused student book marketplace.
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
