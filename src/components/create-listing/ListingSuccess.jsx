import { Link } from "react-router-dom";
import { formatListingPrice } from "../../services/listingValidation.js";
import {
  buttonPrimary,
  buttonSecondary,
  notice,
  tone,
} from "../../styles/ui.js";

function SummaryRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-ink sm:text-right">
        {value}
      </dd>
    </div>
  );
}

function ListingSuccess({ listing }) {
  const { modality } = listing;

  return (
    <section className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-xl font-bold ${tone.sage}`}
          aria-hidden="true"
        >
          ✓
        </span>

        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Listing published!
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Here is a summary of your listing.
          </p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-line border-y border-line">
        <SummaryRow
          label="Book"
          value={`${listing.title} — ${listing.author}`}
        />
        <SummaryRow label="Modality" value={modality} />

        {modality === "Exchange" && (
          <SummaryRow
            label="Desired book"
            value={
              listing.desiredBookMeta
                ? `${listing.desiredBook} — ${listing.desiredBookMeta.author}`
                : "Open to offers"
            }
          />
        )}

        {modality === "Loan" && (
          <SummaryRow label="Duration" value={listing.duration} />
        )}

        {modality === "Rental" && (
          <>
            <SummaryRow
              label="Price"
              value={formatListingPrice(listing.price)}
            />
            <SummaryRow label="Duration" value={listing.duration} />
          </>
        )}

        {modality === "Sale" && (
          <SummaryRow label="Price" value={formatListingPrice(listing.price)} />
        )}
      </dl>

      <p className={`mt-6 text-xs ${notice.info}`}>
        Your listing is now available in the marketplace. It is saved in this
        browser.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link to="/my-books" className={buttonSecondary}>
          Back to My Books
        </Link>

        <Link to={`/listing/${listing.id}`} className={buttonPrimary}>
          View Listing →
        </Link>
      </div>
    </section>
  );
}

export default ListingSuccess;
