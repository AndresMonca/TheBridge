import {
  buttonPrimaryLg,
  eyebrow,
  fieldError,
  inputField,
  pageLead,
} from "../../styles/ui.js";
import OpenLibraryCredit from "./OpenLibraryCredit.jsx";
import QuickSearches from "./QuickSearches.jsx";

function MarketplaceSearchPanel({
  searchInput,
  searchError,
  status,
  onChange,
  onSubmit,
  onSearch,
}) {
  return (
    <div>
      <p className={eyebrow}>Book catalog</p>

      <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Search the book catalog
      </h2>

      <p className={`mt-2 max-w-2xl ${pageLead}`}>
        Look up any published book and save the ones you want to find. These
        are catalog records, not copies shared by members.
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
              className={inputField}
            />

            {searchError && (
              <p className={fieldError} role="alert">
                {searchError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className={buttonPrimaryLg}
          >
            Search
          </button>
        </div>
      </form>

      <QuickSearches onSearch={onSearch} />

      <OpenLibraryCredit />
    </div>
  );
}

export default MarketplaceSearchPanel;
