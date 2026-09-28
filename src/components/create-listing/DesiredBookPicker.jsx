import { useRef } from "react";
import { useCatalogSearch } from "../../hooks/useCatalogSearch.js";
import {
  buttonGhost,
  buttonSecondaryLg,
  buttonSecondarySm,
  fieldError,
  fieldLabel,
  focusRing,
  inputField,
  notice,
} from "../../styles/ui.js";
import BookCover from "../catalog/BookCover.jsx";

const MAX_RESULTS = 8;

function toDesiredBookMeta(book) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    coverUrl: book.coverUrl || null,
    isbn: book.isbn || null,
    publisher: book.publisher || null,
  };
}

function CatalogResults({ search, onSelect }) {
  if (search.status === "loading") {
    return (
      <p className="mt-3 text-sm font-medium text-ink-muted" role="status">
        Searching the catalog...
      </p>
    );
  }

  if (search.status === "error") {
    return (
      <div className={`mt-3 ${notice.danger}`} role="alert">
        <p className="text-sm font-semibold">We could not reach the catalog.</p>
        <button
          type="button"
          onClick={search.retrySearch}
          className={`mt-2 rounded-md text-sm font-semibold underline underline-offset-4 ${focusRing}`}
        >
          Try again
        </button>
      </div>
    );
  }

  if (search.status === "no-results") {
    return (
      <p className="mt-3 text-sm text-ink-muted" role="status">
        No books found for "{search.submittedQuery}".
      </p>
    );
  }

  if (search.status !== "results") {
    return null;
  }

  const visibleResults = search.results.slice(0, MAX_RESULTS);

  return (
    <div className="mt-3">
      <p className="text-xs text-ink-muted" role="status">
        Select the exact book you want ({visibleResults.length}{" "}
        {visibleResults.length === 1 ? "result" : "results"}).
      </p>

      <ul className="mt-2 max-h-[26rem] divide-y divide-line overflow-y-auto rounded-2xl border border-line bg-surface">
        {visibleResults.map((book) => (
          <li key={book.id}>
            <button
              type="button"
              onClick={() => onSelect(book)}
              className="flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-surface-muted focus:outline-none focus-visible:bg-wine-soft"
            >
              <BookCover
                src={book.coverUrl}
                title={book.title}
                className="h-16 w-11 shrink-0 rounded-md"
              />

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">
                  {book.title}
                </span>
                <span className="block truncate text-sm text-ink-muted">
                  {book.author}
                </span>
                {book.year && (
                  <span className="block text-xs text-ink-muted">
                    {book.year}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DesiredBookPicker({ values, error, onChange }) {
  const search = useCatalogSearch();
  const inputRef = useRef(null);
  const changeButtonRef = useRef(null);
  const selected = values.desiredBookMeta;

  const handleQueryChange = (event) => {
    search.handleQueryChange(event);
    onChange("desiredBookQuery", event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      search.submitSearch();
    }
  };

  const selectBook = (book) => {
    onChange("desiredBookMeta", toDesiredBookMeta(book));
    onChange("desiredBook", book.title);
    requestAnimationFrame(() => changeButtonRef.current?.focus());
  };

  const changeBook = () => {
    onChange("desiredBookMeta", null);
    onChange("desiredBook", "");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const removeBook = () => {
    onChange("desiredBookMeta", null);
    onChange("desiredBook", "");
    onChange("desiredBookQuery", "");
    search.resetSearch();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const optionalHint = (
    <span className="font-normal text-ink-muted">(optional)</span>
  );

  if (selected) {
    return (
      <div>
        <p className={fieldLabel}>Desired book {optionalHint}</p>

        <div className="flex gap-4 rounded-2xl border border-wine/30 bg-wine-soft p-4">
          <BookCover
            src={selected.coverUrl}
            title={selected.title}
            className="h-24 w-16 shrink-0 rounded-md shadow-card"
          />

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-wine-ink">
              Selected from the catalog
            </p>
            <p className="mt-1 font-semibold text-ink">{selected.title}</p>
            <p className="text-sm text-ink-muted">{selected.author}</p>
            {(selected.year || selected.publisher) && (
              <p className="mt-0.5 truncate text-xs text-ink-muted">
                {[selected.year, selected.publisher]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                ref={changeButtonRef}
                type="button"
                onClick={changeBook}
                className={buttonSecondarySm}
              >
                Change book
              </button>
              <button
                type="button"
                onClick={removeBook}
                className={buttonGhost}
              >
                Remove selection
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const describedBy = [
    "desired-book-hint",
    error ? "desired-book-error" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor="desiredBookSearch" className={fieldLabel}>
        Desired book {optionalHint}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          id="desiredBookSearch"
          type="search"
          value={search.query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          placeholder="Search by title, author, or ISBN"
          aria-invalid={Boolean(error || search.validationError)}
          aria-describedby={describedBy}
          className={inputField}
        />

        <button
          type="button"
          onClick={search.submitSearch}
          className={`shrink-0 ${buttonSecondaryLg}`}
        >
          Search
        </button>
      </div>

      <p id="desired-book-hint" className="mt-2 text-xs text-ink-muted">
        Leave it empty to stay open to offers. Book data powered by Open
        Library.
      </p>

      {search.validationError && (
        <p className={fieldError} role="alert">
          {search.validationError}
        </p>
      )}

      {error && (
        <p id="desired-book-error" className={fieldError} role="alert">
          {error}
        </p>
      )}

      <CatalogResults search={search} onSelect={selectBook} />
    </div>
  );
}

export default DesiredBookPicker;
