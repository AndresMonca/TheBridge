import {
  buttonSecondaryLg,
  fieldError,
  fieldLabel,
  inputField,
} from "../../styles/ui.js";
import DesiredBookResults from "./DesiredBookResults.jsx";

function DesiredBookSearch({
  search,
  inputRef,
  error,
  onQueryChange,
  onKeyDown,
  onSelect,
}) {
  const describedBy = [
    "desired-book-hint",
    error ? "desired-book-error" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor="desiredBookSearch" className={fieldLabel}>
        Desired book{" "}
        <span className="font-normal text-ink-muted">(optional)</span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          id="desiredBookSearch"
          type="search"
          value={search.query}
          onChange={onQueryChange}
          onKeyDown={onKeyDown}
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

      <DesiredBookResults search={search} onSelect={onSelect} />
    </div>
  );
}

export default DesiredBookSearch;
