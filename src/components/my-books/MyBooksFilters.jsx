const FILTERS = ["All", "Available", "Published", "Loaned"];

function MyBooksFilters({ activeFilter, counts, onChange }) {
  return (
    <div
      className="mt-7 flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter personal books"
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={`rounded-xl px-4 py-2 text-sm font-extrabold transition focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
              isActive
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {filter} {counts[filter]}
          </button>
        );
      })}
    </div>
  );
}

export default MyBooksFilters;
