function AddBookSearchForm({
  query,
  validationError,
  onQueryChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label
        htmlFor="book-search"
        className="text-sm font-extrabold text-slate-950 dark:text-white"
      >
        Search for a book
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="book-search"
          type="search"
          value={query}
          onChange={onQueryChange}
          aria-invalid={Boolean(validationError)}
          aria-describedby={
            validationError ? "search-validation-error" : undefined
          }
          placeholder="Title, author, or ISBN"
          className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          Search
        </button>
      </div>

      {validationError && (
        <p
          id="search-validation-error"
          className="text-sm font-bold text-red-600 dark:text-red-400"
          role="alert"
        >
          {validationError}
        </p>
      )}
    </form>
  );
}

export default AddBookSearchForm;
