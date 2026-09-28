import { listings } from "../../data/listings.js";
import { computeListingStats } from "../../services/listingFilters.js";

const stats = computeListingStats(listings);

const SUMMARY_ITEMS = [
  { label: "Community listings", value: stats.total },
  { label: "Sharing modes", value: Object.keys(stats.byModality).length },
  { label: "Exchange options", value: stats.byModality.Exchange?.count ?? 0 },
  { label: "Books for sale", value: stats.byModality.Sale?.count ?? 0 },
];

function CommunitySummary() {
  return (
    <section aria-labelledby="community-summary-title" className="mt-8">
      <h2
        id="community-summary-title"
        className="text-xl font-black text-slate-950 dark:text-white"
      >
        The community at a glance
      </h2>

      <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {SUMMARY_ITEMS.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <dt className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {label}
            </dt>
            <dd className="mt-1 text-3xl font-black text-slate-950 dark:text-white">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default CommunitySummary;
