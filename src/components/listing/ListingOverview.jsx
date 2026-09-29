import { getListingOfferLabel } from "../../services/listingFilters.js";
import { badge, eyebrow, modalityTone, pageLead } from "../../styles/ui.js";

function ListingOverview({ listing }) {
  return (
    <>
      <p className={eyebrow}>{listing.genre}</p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl sm:leading-[1.05]">
        {listing.title}
      </h1>

      <p className="mt-2 text-lg text-ink-muted">{listing.author}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className={`${badge} ${modalityTone[listing.modality] ?? ""}`}>
          {listing.modality}
        </span>
        <span className={`${badge} bg-surface-muted text-ink-muted`}>
          {listing.condition}
        </span>
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-tight text-ink">
        {getListingOfferLabel(listing)}
      </p>

      <p className={`mt-6 max-w-2xl ${pageLead}`}>{listing.description}</p>
    </>
  );
}

export default ListingOverview;
