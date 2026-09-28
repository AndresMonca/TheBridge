import ListingCard from "./ListingCard.jsx";

function ListingGrid({ listings, onReset }) {
  if (listings.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          No listings match your filters
        </h2>

        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          Try another title, author, or ISBN, or remove some filters.
        </p>

        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <section aria-labelledby="community-listings-title">
      <h2 id="community-listings-title" className="sr-only">
        Community listings
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 2xl:grid-cols-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

export default ListingGrid;
