function ListingMetaItem({ label, value, wide = false }) {
  if (!value) {
    return null;
  }

  return (
    <div
      className={`rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <dt className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
        {label}
      </dt>

      <dd className="mt-1 text-sm font-extrabold text-slate-950 dark:text-white">
        {value}
      </dd>
    </div>
  );
}

function ListingMetaGrid({ listing, priceLabel }) {
  return (
    <dl className="mt-8 grid gap-4 sm:grid-cols-2">
      <ListingMetaItem label="Owner" value={listing.owner} />
      <ListingMetaItem label="University" value={listing.university} />
      <ListingMetaItem label="Year" value={listing.year} />
      <ListingMetaItem label="Status" value={listing.status} />
      <ListingMetaItem label="Price" value={priceLabel} />
      <ListingMetaItem label="Duration" value={listing.duration} />
      <ListingMetaItem
        label="Looking for"
        value={listing.desiredBook}
        wide
      />
    </dl>
  );
}

export default ListingMetaGrid;
