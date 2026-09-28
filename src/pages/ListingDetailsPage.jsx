import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import ListingCoverCard from "../components/listing/ListingCoverCard.jsx";
import ListingMetaGrid from "../components/listing/ListingMetaGrid.jsx";
import ListingRequestModal from "../components/listing/ListingRequestModal.jsx";
import { getListingOfferLabel } from "../services/listingFilters.js";
import { getRequestCtaLabel } from "../services/listingRequest.js";
import { hasActiveSentRequest } from "../services/requestsStorage.js";
import {
  badge,
  buttonPrimary,
  buttonSuccess,
  eyebrow,
  modalityTone,
  pageLead,
} from "../styles/ui.js";

function formatPrice(price) {
  if (price === null || price === undefined) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
}

function ListingDetailsPage({ listing }) {
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(
    () => Boolean(listing) && hasActiveSentRequest(listing.id),
  );

  if (!listing) {
    return (
      <AppShell
        activePage="listing"
        title="Listing details"
        subtitle="This listing could not be found"
      >
        <section className="mx-auto max-w-xl py-20 text-center">
          <p className={eyebrow}>Listing unavailable</p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            We could not find this book.
          </h1>

          <Link to="/marketplace" className={`mt-8 ${buttonPrimary}`}>
            Return to Marketplace
          </Link>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell
      activePage="listing"
      title="Listing details"
      subtitle={`${listing.title} by ${listing.author}`}
    >
      <article className="grid gap-10 pt-2 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16 lg:pt-6">
        <ListingCoverCard listing={listing} />

        <section className="min-w-0">
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

          <ListingMetaGrid
            listing={listing}
            priceLabel={formatPrice(listing.price)}
          />

          <button
            type="button"
            onClick={() => setRequestOpen(true)}
            disabled={requestSent}
            className={`mt-8 w-full sm:w-auto sm:px-8 ${
              requestSent ? buttonSuccess : buttonPrimary
            }`}
          >
            {requestSent
              ? "✓ Request sent"
              : getRequestCtaLabel(listing.modality)}
          </button>

          <p className="sr-only" aria-live="polite">
            {requestSent ? "Your simulated request was sent." : ""}
          </p>
        </section>
      </article>

      <ListingRequestModal
        listing={listing}
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        onSent={() => setRequestSent(true)}
      />
    </AppShell>
  );
}

export default ListingDetailsPage;
