import { buttonPrimaryLg, fieldError, inputBase } from "../../styles/ui.js";

function AddBookSearchForm({
  query,
  validationError,
  onQueryChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="book-search" className="mb-3 block text-sm font-semibold text-ink">
        Search for a book
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <svg
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-subtle"
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
            value={query}
            onChange={onQueryChange}
            aria-invalid={Boolean(validationError)}
            aria-describedby={
              validationError ? "search-validation-error" : undefined
            }
            placeholder="Title, author, or ISBN"
            className={`${inputBase} h-14 pl-[3.25rem] shadow-card`}
          />
        </div>

        <button type="submit" className={`sm:h-14 sm:px-8 ${buttonPrimaryLg}`}>
          Search
        </button>
      </div>

      {validationError && (
        <p id="search-validation-error" className={fieldError} role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
}

export default AddBookSearchForm;
