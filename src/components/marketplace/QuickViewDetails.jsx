import { getListingOfferRows } from "../../services/listingRequest.js";

function DetailRow({ label, value, strong = false }) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd
        className={`text-right text-sm text-ink ${strong ? "font-semibold" : "font-medium"}`}
      >
        {value}
      </dd>
    </div>
  );
}

function QuickViewDetails({ listing }) {
  return (
    <>
      <dl className="mt-6 divide-y divide-line rounded-2xl bg-surface-muted px-4 py-1">
        {getListingOfferRows(listing).map((row) => (
          <DetailRow
            key={row.label}
            label={row.label}
            value={row.value}
            strong
          />
        ))}
      </dl>

      {listing.description && (
        <p className="mt-6 text-[15px] leading-7 text-ink-muted">
          {listing.description}
        </p>
      )}

      <dl className="mt-6 divide-y divide-line border-y border-line">
        <DetailRow label="Genre" value={listing.genre} />
        <DetailRow label="Year" value={listing.year} />
        <DetailRow label="Publisher" value={listing.publisher} />
        <DetailRow label="ISBN" value={listing.isbn} />
      </dl>

      <div className="mt-6 flex items-center gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-wine-soft text-sm font-semibold text-wine-ink"
          aria-hidden="true"
        >
          {listing.owner?.[0]}
        </span>

        <div className="min-w-0">
          <p className="text-xs text-ink-muted">Shared by</p>
          <p className="text-sm font-semibold text-ink">
            {listing.owner}
          </p>
          {listing.university && (
            <p className="truncate text-xs text-ink-muted">
              {listing.university}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default QuickViewDetails;
