function ListingCoverCard({ listing }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <img
          src={listing.cover}
          alt={`Cover of ${listing.title}`}
          className="aspect-[3/4] h-full w-full object-cover"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
          {listing.modality}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {listing.condition}
        </span>
      </div>
    </section>
  );
}

export default ListingCoverCard;
