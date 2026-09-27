function SearchBar({ value, onChange, onSubmit, disabled = false }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row"
      role="search"
    >
      <div className="relative flex-1">
        <label htmlFor="book-search" className="sr-only">
          Search books
        </label>

        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>

        <input
          id="book-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by title, author, or keyword"
          autoComplete="off"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
