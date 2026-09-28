import { Link } from "react-router-dom";
import { listings } from "../../data/listings.js";
import { getNewestListings } from "../../services/listingFilters.js";
import { buttonGhost, sectionTitle } from "../../styles/ui.js";
import ListingCard from "../marketplace/ListingCard.jsx";

const FEATURED_LISTINGS = getNewestListings(listings, 4);

function FeaturedListings() {
  return (
    <section aria-labelledby="featured-listings-title" className="mt-16 lg:mt-20">
      <div className="flex items-end justify-between gap-4">
        <h2 id="featured-listings-title" className={sectionTitle}>
          Recently shared
        </h2>

        <Link to="/marketplace" className={`-mr-3 ${buttonGhost}`}>
          View all listings
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FEATURED_LISTINGS.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedListings;
