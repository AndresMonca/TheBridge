import { buttonGhost, notice, textLink } from "../../styles/ui.js";
import AddBookResultCard from "./AddBookResultCard.jsx";

function AddBookSearchState({ search, onSelect }) {
  if (search.status === "idle") {
    return (
      <p className="mt-8 rounded-2xl bg-surface-muted px-6 py-10 text-center text-sm text-ink-muted">
        Search the catalog to find the physical book you want to add.
      </p>
    );
  }

  if (search.status === "loading") {
    return (
      <p
        className="mt-8 text-center text-sm font-semibold text-ink-muted"
        role="status"
      >
        Searching the catalog...
      </p>
    );
  }

  if (search.status === "error") {
    return (
      <div className={`mt-8 text-center ${notice.danger}`}>
        <p className="text-sm font-semibold">
          We could not complete the search.
        </p>
        <button
          type="button"
          onClick={search.retrySearch}
          className="mt-3 rounded-md text-sm font-semibold underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          Try again
        </button>
      </div>
    );
  }

  if (search.status === "no-results") {
    return (
      <div className="mt-8 rounded-2xl bg-surface-muted px-6 py-10 text-center">
        <p className="text-sm font-semibold text-ink">
          No books found for "{search.submittedQuery}".
        </p>
        <button
          type="button"
          onClick={search.resetSearch}
          className={`mt-3 text-sm ${textLink}`}
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
    <div className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          <span className="font-semibold text-ink">{search.results.length}</span>{" "}
          {search.results.length === 1 ? "book" : "books"} found for "
          {search.submittedQuery}"
        </p>

        <button type="button" onClick={search.resetSearch} className={`-mr-3 ${buttonGhost}`}>
          Clear
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
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
