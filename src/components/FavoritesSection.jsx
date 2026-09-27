function FavoritesSection({ favorites, onToggleFavorite }) {
  return (
    <section
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
      aria-labelledby="favorites-title"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-rose-500">
            Saved books
          </p>

          <h2
            id="favorites-title"
            className="mt-1 text-xl font-black text-slate-950 dark:text-white"
          >
            Favorites
          </h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {favorites.length}
        </span>
      </div>

      {favorites.length === 0 ? (
        <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
          Books you save will appear here.
        </p>
      ) : (
        <ul className="mt-5 space-y-3">
          {favorites.map((book) => (
            <li
              key={book.id}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 dark:border-slate-700"
            >
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt=""
                  className="h-16 w-12 shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  className="h-16 w-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800"
                  aria-hidden="true"
                />
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-slate-950 dark:text-white">
                  {book.title}
                </p>

                <p className="mt-1 truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {book.author || "Unknown author"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onToggleFavorite(book)}
                className="shrink-0 rounded-xl px-3 py-2 text-xs font-extrabold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-500/20 dark:text-rose-300 dark:hover:bg-rose-500/10"
                aria-label={`Remove ${book.title} from favorites`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FavoritesSection;
