import { buttonSecondarySm, card } from "../../styles/ui.js";

function AddBookResultCard({ book, onSelect }) {
  return (
    <article className={`flex items-center gap-4 p-3 transition-colors hover:border-line-strong ${card}`}>
      <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
        {book.cover ? (
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-1 text-center text-[10px] font-medium leading-tight text-ink-muted">
            Cover unavailable
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink">
          {book.title}
        </h3>

        <p className="mt-0.5 truncate text-sm text-ink-muted">{book.author}</p>

        {(book.year || book.publisher) && (
          <p className="mt-0.5 truncate text-xs text-ink-muted">
            {[book.year, book.publisher].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onSelect(book)}
        className={`shrink-0 ${buttonSecondarySm}`}
        aria-label={`Select ${book.title} by ${book.author}`}
      >
        Select
      </button>
    </article>
  );
}

export default AddBookResultCard;
