import { getListingOfferRows } from "../../services/listingRequest.js";

function RequestOfferRows({ listing }) {
  return (
    <dl className="mt-6 divide-y divide-line border-y border-line">
      {getListingOfferRows(listing).map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 py-3"
        >
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {row.label}
          </dt>
          <dd className="text-right text-sm font-semibold text-ink">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default RequestOfferRows;
