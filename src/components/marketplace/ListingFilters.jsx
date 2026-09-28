import { listingModalities } from "../../data/createListingData.js";
import { listings } from "../../data/listings.js";
import { ALL_OPTION, getUniqueValues } from "../../services/listingFilters.js";
import {
  buttonGhost,
  chip,
  eyebrow,
  inputBase,
  pageLead,
  pageTitle,
} from "../../styles/ui.js";
import FilterSelect from "./FilterSelect.jsx";

const GENRES = getUniqueValues(listings, "genre");
const CONDITIONS = getUniqueValues(listings, "condition");
const MODALITIES = [ALL_OPTION, ...listingModalities.map(({ id }) => id)];

function ListingFilters({ filters, resultCount, hasActiveFilters, onChange, onReset }) {
  return (
    <div>
      <header className="max-w-2xl">
        <p className={eyebrow}>Community books</p>
        <h1 className={`mt-3 ${pageTitle}`}>
          Find your next book through your community.
        </h1>
        <p className={`mt-3 ${pageLead}`}>
          Physical copies shared on TheBridge by people in your community — to exchange, borrow, rent, or buy.
        </p>
      </header>

      <form role="search" className="mt-8" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="listing-search" className="sr-only">
          Search listings
        </label>
        <div className="relative">
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
            id="listing-search"
            type="search"
            value={filters.search}
            onChange={(event) => onChange("search", event.target.value)}
            placeholder="Search by title, author, genre, or ISBN"
            className={`${inputBase} h-14 pl-[3.25rem] shadow-card`}
          />
        </div>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <fieldset>
            <legend className="sr-only">Sharing modality</legend>
            <div className="flex flex-wrap gap-2">
              {MODALITIES.map((modality) => (
                <button
                  key={modality}
                  type="button"
                  aria-pressed={filters.modality === modality}
                  onClick={() => onChange("modality", modality)}
                  className={chip}
                >
                  {modality}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-2 gap-3 lg:w-[22rem]">
            <FilterSelect id="genre-filter" label="Genre" value={filters.genre} options={GENRES} onChange={(value) => onChange("genre", value)} />
            <FilterSelect id="condition-filter" label="Condition" value={filters.condition} options={CONDITIONS} onChange={(value) => onChange("condition", value)} />
          </div>
        </div>
      </form>

      <div className="mt-8 flex min-h-9 flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted" aria-live="polite">
          <span className="font-semibold text-ink">{resultCount}</span>{" "}
          {resultCount === 1 ? "listing" : "listings"} found
        </p>
        {hasActiveFilters && (
          <button type="button" onClick={onReset} className={`-mr-3 ${buttonGhost}`}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

export default ListingFilters;
