function ExchangeBookOptions({
  books,
  selectedBookId,
  error,
  onChange,
}) {
  if (!books.length) {
    return (
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
        <p className="text-sm font-extrabold text-amber-900 dark:text-amber-200">
          You have no available books to offer
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-300">
          Add an available book to your library before requesting an exchange.
        </p>
      </div>
    );
  }

  return (
    <fieldset
      className="mt-5"
      aria-describedby={error ? "exchange-offer-error" : undefined}
    >
      <legend className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
        Your available books
      </legend>

      <div className="mt-3 space-y-2">
        {books.map((book) => (
          <label
            key={book.id}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-3 transition hover:border-indigo-300 dark:border-slate-700"
          >
            <input
              type="radio"
              name="exchange-book"
              value={book.id}
              checked={selectedBookId === book.id}
              onChange={() => onChange(book.id)}
              className="h-4 w-4 accent-indigo-600"
            />

            <div className="h-14 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
              {book.cover && (
                <img
                  src={book.cover}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-slate-950 dark:text-white">
                {book.title}
              </p>

              <p className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                {book.author}
              </p>
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p
          id="exchange-offer-error"
          role="alert"
          className="mt-3 text-sm font-bold text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default ExchangeBookOptions;
