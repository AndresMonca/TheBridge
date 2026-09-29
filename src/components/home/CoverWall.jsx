import { listings } from "../../data/listings.js";

function CoverWall() {
  return (
    <div className="grid h-full scale-105 grid-cols-4 content-start gap-2 p-2 blur-[2px] saturate-[.85] sm:grid-cols-6 lg:grid-cols-8">
      {listings.map((listing) => (
        <img
          key={listing.id}
          src={listing.cover}
          alt=""
          loading="lazy"
          className="aspect-[2/3] w-full rounded-md bg-surface-muted object-cover"
        />
      ))}
    </div>
  );
}

export default CoverWall;
