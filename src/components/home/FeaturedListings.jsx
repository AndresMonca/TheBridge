import { Link } from "react-router-dom";
import { listings } from "../../data/listings.js";
import { getNewestListings } from "../../services/listingFilters.js";
import ListingCard from "../marketplace/ListingCard.jsx";

const FEATURED_LISTINGS = getNewestListings(listings, 4);

function FeaturedListings() {
  return (
    <section aria-labelledby="featured-listings-title" className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <h2
          id="featured-listings-title"
          className="text-xl font-black text-slate-950 dark:text-white"
        >
          Recently shared
        </h2>

        <Link
          to="/marketplace"
          className="rounded-xl px-3 py-2 text-sm font-extrabold text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:text-indigo-300 dark:hover:bg-slate-800"
        >
          View all listings
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {FEATURED_LISTINGS.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedListings;
