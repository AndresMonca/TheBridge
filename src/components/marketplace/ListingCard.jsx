import { useState } from "react";
import { Link } from "react-router-dom";
import { getListingOfferLabel } from "../../services/listingFilters.js";

function ListingCard({ listing, headingLevel: Heading = "h3" }) {
  const [coverFailed, setCoverFailed] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition focus-within:ring-4 focus-within:ring-blue-500/20 hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {coverFailed ? (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-6 text-center dark:from-slate-800 dark:to-slate-900">
            <span className="text-sm font-extrabold text-slate-600 dark:text-slate-300">
              {listing.title}
            </span>
          </div>
        ) : (
          <img
            src={listing.cover}
            alt={`Cover of ${listing.title}`}
            loading="lazy"
            onError={() => setCoverFailed(true)}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            {listing.modality}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {listing.condition}
          </span>
        </div>

        <Heading className="mt-3 line-clamp-2 text-base font-black leading-snug text-slate-950 dark:text-white">
          <Link
            to={`/listing/${listing.id}`}
            className="after:absolute after:inset-0 focus:outline-none"
          >
            {listing.title}
          </Link>
        </Heading>

        <p className="mt-1 truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
          {listing.author}
        </p>

        <p className="mt-3 truncate text-sm font-extrabold text-indigo-700 dark:text-indigo-300">
          {getListingOfferLabel(listing)}
        </p>
      </div>
    </article>
  );
}

export default ListingCard;
