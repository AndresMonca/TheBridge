function SidebarToggleIcon({ expanded }) {
  return (
    <svg
      className={`h-5 w-5 ${expanded ? "" : "rotate-180"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M14 8l-4 4 4 4" />
    </svg>
  );
}

export default SidebarToggleIcon;
