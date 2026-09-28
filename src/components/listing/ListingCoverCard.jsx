function ListingCoverCard({ listing }) {
  return (
    <figure className="mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none">
      <div className="overflow-hidden rounded-2xl bg-surface-muted shadow-lift">
        <img
          src={listing.cover}
          alt={`Cover of ${listing.title}`}
          className="aspect-[3/4] h-full w-full object-cover"
        />
      </div>
    </figure>
  );
}

export default ListingCoverCard;
