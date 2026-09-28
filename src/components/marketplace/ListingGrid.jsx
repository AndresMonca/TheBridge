import { buttonSecondary } from "../../styles/ui.js";
import ListingCard from "./ListingCard.jsx";

function ListingGrid({ listings, onReset, onSelect }) {
  if (listings.length === 0) {
    return (
      <div className="rounded-2xl bg-surface-muted px-6 py-16 text-center">
        <h2 className="text-lg font-semibold text-ink">
          No listings match your filters
        </h2>

        <p className="mt-2 text-sm text-ink-muted">
          Try another title, author, or ISBN, or remove some filters.
        </p>

        <button type="button" onClick={onReset} className={`mt-6 ${buttonSecondary}`}>
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <section aria-labelledby="community-listings-title">
      <h2 id="community-listings-title" className="sr-only">
        Books shared on TheBridge
      </h2>

      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

export default ListingGrid;
