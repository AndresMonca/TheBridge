function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-6 text-center dark:from-slate-800 dark:to-slate-900">
            <span className="text-sm font-extrabold text-slate-500 dark:text-slate-400">
              Cover unavailable
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => onToggleFavorite(book)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${book.title} from favorites`
              : `Add ${book.title} to favorites`
          }
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border shadow-sm backdrop-blur transition focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
            isFavorite
              ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
              : "border-white/60 bg-white/90 text-slate-600 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300"
          }`}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <h2 className="line-clamp-2 text-lg font-black leading-snug text-slate-950 dark:text-white">
          {book.title}
        </h2>

        <p className="mt-2 truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
          {book.author || "Unknown author"}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>{book.year || "Year unknown"}</span>
          <span>{book.editionCount || 1} edition(s)</span>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
