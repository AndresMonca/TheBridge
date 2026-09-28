import { listingModalities } from "../../data/createListingData.js";
import { listings } from "../../data/listings.js";
import { ALL_OPTION, getUniqueValues } from "../../services/listingFilters.js";
import FilterSelect from "./FilterSelect.jsx";

const GENRES = getUniqueValues(listings, "genre");
const CONDITIONS = getUniqueValues(listings, "condition");
const MODALITIES = [ALL_OPTION, ...listingModalities.map(({ id }) => id)];

function ListingFilters({ filters, resultCount, hasActiveFilters, onChange, onReset }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
        Community listings
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        Find your next book
      </h1>

      <form role="search" className="mt-6" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="listing-search" className="text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Search listings
        </label>
        <input
          id="listing-search"
          type="search"
          value={filters.search}
          onChange={(event) => onChange("search", event.target.value)}
          placeholder="Title, author, genre, or ISBN"
          className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        <fieldset className="mt-5">
          <legend className="text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Sharing modality
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {MODALITIES.map((modality) => (
              <button
                key={modality}
                type="button"
                aria-pressed={filters.modality === modality}
                onClick={() => onChange("modality", modality)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-600 transition hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 aria-pressed:border-slate-950 aria-pressed:bg-slate-950 aria-pressed:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:aria-pressed:border-white dark:aria-pressed:bg-white dark:aria-pressed:text-slate-950"
              >
                {modality}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <FilterSelect id="genre-filter" label="Genre" value={filters.genre} options={GENRES} onChange={(value) => onChange("genre", value)} />
          <FilterSelect id="condition-filter" label="Condition" value={filters.condition} options={CONDITIONS} onChange={(value) => onChange("condition", value)} />
        </div>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300" aria-live="polite">
          {resultCount} {resultCount === 1 ? "listing" : "listings"} found
        </p>
        {hasActiveFilters && (
          <button type="button" onClick={onReset} className="rounded-xl px-3 py-2 text-sm font-extrabold text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:text-indigo-300 dark:hover:bg-slate-800">
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

export default ListingFilters;
