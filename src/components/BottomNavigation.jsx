const mobileItems = [
  { id: "home", label: "Home", href: "./" },
  { id: "marketplace", label: "Marketplace", href: "marketplace.html" },
  { id: "my-books", label: "My Books", href: "my-books.html" },
  { id: "requests", label: "Requests", href: "requests.html" },
  { id: "about", label: "About", href: "about.html" },
];

function MobileIcon({ name }) {
  const commonProps = {
    className: "h-5 w-5",
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

    case "my-books":
      return (
        <svg {...commonProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5Z" />
          <path d="M4 6.5v13" />
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

function BottomNavigation({ activePage = "home" }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-5 gap-1">
        {mobileItems.map((item) => {
          const isActive = activePage === item.id;

          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] font-bold transition focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                }`}
              >
                <MobileIcon name={item.id} />
                <span className="truncate">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
