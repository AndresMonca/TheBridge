function AddBookResultCard({ book, onSelect }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-[2/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {book.cover ? (
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-5 text-center text-sm font-extrabold text-slate-400">
            Cover unavailable
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-extrabold tracking-tight text-slate-950 dark:text-white">
            {book.title}
          </h3>

          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
            {book.author}
          </p>

          {book.year && (
            <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-slate-500">
              {book.year}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSelect(book)}
          className="w-full rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
          aria-label={`Select ${book.title} by ${book.author}`}
        >
          Select this book
        </button>
      </div>
    </article>
  );
}

export default AddBookResultCard;
