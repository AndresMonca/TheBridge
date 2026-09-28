import { badge, cardInteractive, focusRing } from "../styles/ui.js";

function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className={`group overflow-hidden ${cardInteractive}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <span className="text-sm font-medium text-ink-muted">
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
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-sm backdrop-blur transition-colors ${focusRing} ${
            isFavorite
              ? "bg-wine text-white hover:bg-wine-hover"
              : "bg-surface/90 text-ink-muted hover:text-wine-ink"
          }`}
        >
          <svg
            className="h-[18px] w-[18px]"
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

      <div className="p-4">
        <h2 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink">
          {book.title}
        </h2>

        <p className="mt-0.5 truncate text-sm text-ink-muted">
          {book.author || "Unknown author"}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className={`${badge} bg-surface-muted`}>
            {book.year || "Year unknown"}
          </span>
          <span>{book.editionCount || 1} edition(s)</span>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
