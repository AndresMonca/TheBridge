import MyBookStatusAction from "./MyBookStatusAction.jsx";

function MyBookCard({ book }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {book.cover ? (
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm font-extrabold text-slate-400">
            Cover unavailable
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-slate-700 shadow-sm backdrop-blur dark:bg-slate-950/90 dark:text-slate-200">
          {book.status}
        </span>
      </div>

      <div className="p-5">
        <h2 className="truncate text-lg font-black text-slate-950 dark:text-white">
          {book.title}
        </h2>

        <p className="mt-1 truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
          {book.author}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {book.genre}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {book.condition}
          </span>
        </div>

        <div className="mt-5">
          <MyBookStatusAction book={book} />
        </div>
      </div>
    </article>
  );
}

export default MyBookCard;
