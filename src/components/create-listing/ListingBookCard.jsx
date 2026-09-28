import { badge, coverFrame, tone } from "../../styles/ui.js";

function ListingBookCard({ book }) {
  if (!book) {
    return (
      <section className="rounded-2xl bg-surface-muted p-6 text-center">
        <p className="text-sm font-semibold text-ink-muted">
          No available book found.
        </p>
      </section>
    );
  }

  return (
    <section className="flex gap-5 lg:block">
      <div className={`aspect-[2/3] w-28 shrink-0 shadow-card lg:w-full ${coverFrame}`}>
        {book.cover ? (
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm font-medium text-ink-muted">
            Cover unavailable
          </div>
        )}
      </div>

      <div className="min-w-0 lg:mt-5">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          {book.title}
        </h2>

        <p className="mt-0.5 text-sm text-ink-muted">
          {book.author || "Unknown author"}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`${badge} bg-surface-muted text-ink-muted`}>
            {book.condition || "Condition not set"}
          </span>

          <span className={`${badge} ${tone.sage}`}>Available</span>
        </div>
      </div>
    </section>
  );
}

export default ListingBookCard;
