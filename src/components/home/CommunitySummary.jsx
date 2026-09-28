import { listings } from "../../data/listings.js";
import { computeListingStats } from "../../services/listingFilters.js";
import { sectionTitle } from "../../styles/ui.js";

const stats = computeListingStats(listings);

const SUMMARY_ITEMS = [
  { label: "Community listings", value: stats.total },
  { label: "Sharing modes", value: Object.keys(stats.byModality).length },
  { label: "Exchange options", value: stats.byModality.Exchange?.count ?? 0 },
  { label: "Books for sale", value: stats.byModality.Sale?.count ?? 0 },
];

function CommunitySummary() {
  return (
    <section aria-labelledby="community-summary-title" className="mt-16 lg:mt-20">
      <h2 id="community-summary-title" className={sectionTitle}>
        The community at a glance
      </h2>

      <dl className="mt-6 grid grid-cols-2 gap-y-6 border-y border-line py-6 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {SUMMARY_ITEMS.map(({ label, value }) => (
          <div key={label} className="flex flex-col-reverse gap-1 pr-4 lg:px-6 lg:first:pl-0">
            <dt className="text-sm text-ink-muted">{label}</dt>
            <dd className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default CommunitySummary;
