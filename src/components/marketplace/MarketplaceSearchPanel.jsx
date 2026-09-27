const QUICK_SEARCHES = ["Algorithms", "Calculus", "Physics", "Databases"];

function MarketplaceSearchPanel({
  searchInput,
  searchError,
  status,
  onChange,
  onSubmit,
  onSearch,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
        Open Library search
      </p>

      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        Find your next book
      </h1>

      <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
        Search public bibliographic data and save the books that interest you.
      </p>

      <form onSubmit={onSubmit} className="mt-6" role="search" noValidate>
        <label htmlFor="book-search" className="sr-only">
          Search books
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <input
              id="book-search"
              type="search"
              value={searchInput}
              onChange={onChange}
              placeholder="Search by title, author, or keyword"
              aria-invalid={Boolean(searchError)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />

            {searchError && (
              <p className="mt-2 text-xs font-bold text-rose-600" role="alert">
                {searchError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {QUICK_SEARCHES.map((query) => (
          <button
            key={query}
            type="button"
            onClick={() => onSearch(query)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MarketplaceSearchPanel;
