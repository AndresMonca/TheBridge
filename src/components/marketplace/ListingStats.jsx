import { listingModalities } from "../../data/createListingData.js";
import { getAveragePrice } from "../../services/listingFilters.js";
import { formatListingPrice } from "../../services/listingValidation.js";

function formatAverage(modalityStats) {
  const average = getAveragePrice(modalityStats);
  return average === null ? "No priced listings" : formatListingPrice(average);
}

function ListingStats({ stats }) {
  return (
    <section
      aria-labelledby="listing-stats-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
        Live summary
      </p>
      <h2
        id="listing-stats-title"
        className="mt-1 text-xl font-black text-slate-950 dark:text-white"
      >
        Listing stats
      </h2>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        <div className="col-span-2 rounded-2xl bg-slate-950 p-4 text-white dark:bg-white dark:text-slate-950">
          <dt className="text-xs font-bold opacity-80">Listings shown</dt>
          <dd className="mt-1 text-3xl font-black">{stats.total}</dd>
        </div>

        {listingModalities.map(({ id, label }) => (
          <div
            key={id}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
          >
            <dt className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {label}
            </dt>
            <dd className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
              {stats.byModality[id]?.count ?? 0}
            </dd>
          </div>
        ))}
      </dl>

      <dl className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        <div className="flex items-baseline justify-between gap-3 px-4 py-3">
          <dt className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Average sale price
          </dt>
          <dd className="text-right text-sm font-extrabold text-slate-950 dark:text-white">
            {formatAverage(stats.byModality.Sale)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3 px-4 py-3">
          <dt className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Average rental price
          </dt>
          <dd className="text-right text-sm font-extrabold text-slate-950 dark:text-white">
            {formatAverage(stats.byModality.Rental)}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
        Calculated from the listings that match your current search and filters.
      </p>
    </section>
  );
}

export default ListingStats;
