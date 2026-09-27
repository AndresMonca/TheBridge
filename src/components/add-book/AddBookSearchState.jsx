import AddBookResultCard from "./AddBookResultCard.jsx";

function AddBookSearchState({ search, onSelect }) {
  if (search.status === "idle") {
    return (
      <p className="mt-8 rounded-3xl border border-dashed border-slate-300 p-8 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Search the catalog to find the physical book you want to add.
      </p>
    );
  }

  if (search.status === "loading") {
    return (
      <p
        className="mt-8 text-center text-sm font-extrabold text-slate-500 dark:text-slate-400"
        role="status"
      >
        Searching the catalog...
      </p>
    );
  }

  if (search.status === "error") {
    return (
      <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/60 dark:bg-red-950/20">
        <p className="text-sm font-extrabold text-red-700 dark:text-red-300">
          We could not complete the search.
        </p>
        <button
          type="button"
          onClick={search.retrySearch}
          className="mt-4 text-sm font-extrabold text-red-700 underline underline-offset-4 dark:text-red-300"
        >
          Try again
        </button>
      </div>
    );
  }

  if (search.status === "no-results") {
    return (
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-extrabold text-slate-950 dark:text-white">
          No books found for "{search.submittedQuery}".
        </p>
        <button
          type="button"
          onClick={search.resetSearch}
          className="mt-4 text-sm font-extrabold text-indigo-600 underline underline-offset-4 dark:text-indigo-400"
        >
          Clear search
        </button>
      </div>
    );
  }

  if (search.status !== "results") {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-extrabold text-slate-600 dark:text-slate-300">
          {search.results.length}{" "}
          {search.results.length === 1 ? "book" : "books"} found for "
          {search.submittedQuery}"
        </p>

        <button
          type="button"
          onClick={search.resetSearch}
          className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400"
        >
          Clear
        </button>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {search.results.map((book) => (
          <AddBookResultCard
            key={book.id}
            book={book}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default AddBookSearchState;
