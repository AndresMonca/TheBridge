function ListingBookCard({ book }) {
  if (!book) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm font-extrabold text-slate-500 dark:text-slate-400">
          No available book found.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-[2/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {book.cover ? (
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm font-extrabold text-slate-400">
            Cover unavailable
          </div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
            {book.title}
          </h2>

          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {book.author || "Unknown author"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {book.condition || "Condition not set"}
          </span>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            Available
          </span>
        </div>
      </div>
    </section>
  );
}

export default ListingBookCard;
