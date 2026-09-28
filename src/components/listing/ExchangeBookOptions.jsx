import { fieldError, notice } from "../../styles/ui.js";

function ExchangeBookOptions({
  books,
  selectedBookId,
  error,
  onChange,
}) {
  if (!books.length) {
    return (
      <div className={`mt-6 ${notice.warning}`}>
        <p className="text-sm font-semibold">
          You have no available books to offer
        </p>

        <p className="mt-1 text-sm leading-6 opacity-90">
          Add an available book to your library before requesting an exchange.
        </p>
      </div>
    );
  }

  return (
    <fieldset
      className="mt-6"
      aria-describedby={error ? "exchange-offer-error" : undefined}
    >
      <legend className="text-sm font-semibold text-ink">
        Your available books
      </legend>

      <div className="mt-3 space-y-2">
        {books.map((book) => (
          <label
            key={book.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:border-line-strong has-[:checked]:border-wine has-[:checked]:bg-wine-soft has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-wine has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-canvas"
          >
            <input
              type="radio"
              name="exchange-book"
              value={book.id}
              checked={selectedBookId === book.id}
              onChange={() => onChange(book.id)}
              className="h-4 w-4 accent-wine"
            />

            <div className="h-14 w-10 shrink-0 overflow-hidden rounded-md bg-surface-muted">
              {book.cover && (
                <img
                  src={book.cover}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {book.title}
              </p>

              <p className="truncate text-xs text-ink-muted">
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
          className={fieldError}
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default ExchangeBookOptions;
