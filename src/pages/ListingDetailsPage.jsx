import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import ListingCoverCard from "../components/listing/ListingCoverCard.jsx";
import ListingMetaGrid from "../components/listing/ListingMetaGrid.jsx";
import ListingRequestModal from "../components/listing/ListingRequestModal.jsx";
import { getRequestCtaLabel } from "../services/listingRequest.js";

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
  const [requestSent, setRequestSent] = useState(false);

  if (!listing) {
    return (
      <AppShell
        activePage="listing"
        title="Listing details"
        subtitle="This listing could not be found"
      >
        <section className="mx-auto max-w-xl py-16 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Listing unavailable
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            We could not find this book.
          </h1>

          <Link
            to="/marketplace"
            className="mt-7 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
          >
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
      <article className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <ListingCoverCard listing={listing} />

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            {listing.genre}
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            {listing.title}
          </h1>

          <p className="mt-2 text-lg font-semibold text-slate-500 dark:text-slate-400">
            {listing.author}
          </p>

          <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
            {listing.description}
          </p>

          <ListingMetaGrid
            listing={listing}
            priceLabel={formatPrice(listing.price)}
          />

          <button
            type="button"
            onClick={() => setRequestOpen(true)}
            disabled={requestSent}
            className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-default disabled:from-emerald-600 disabled:to-emerald-600 disabled:hover:translate-y-0"
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
