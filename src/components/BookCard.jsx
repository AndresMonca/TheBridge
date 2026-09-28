import { cardInteractive, focusRing } from "../styles/ui.js";
import BookCover from "./catalog/BookCover.jsx";
import BookMetadata from "./catalog/BookMetadata.jsx";

function BookCard({ book, isFavorite, onToggleFavorite }) {
  const summary = [book.publicationYear || book.year, book.publisher]
    .filter(Boolean)
    .join(" · ");
  const hasDetails =
    book.publisher || book.language || book.isbn || book.editionCount > 1;

  return (
    <article className={`group flex flex-col overflow-hidden ${cardInteractive}`}>
      <div className="relative aspect-[3/4] overflow-hidden">
        <BookCover
          src={book.coverUrl}
          title={book.title}
          className="h-full w-full transition duration-500 group-hover:scale-[1.02]"
        />

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

      <div className="flex flex-1 flex-col p-4">
        <h2 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink">
          {book.title}
        </h2>

        <p className="mt-0.5 truncate text-sm text-ink-muted">
          {book.author || "Unknown author"}
        </p>

        <p className="mt-2 truncate text-xs text-ink-muted">
          {summary || "Publication details unavailable"}
        </p>

        {hasDetails && (
          <details className="group/details mt-3 border-t border-line pt-2">
            <summary
              className={`flex cursor-pointer list-none items-center justify-between rounded-md py-1 text-xs font-semibold text-wine-ink [&::-webkit-details-marker]:hidden ${focusRing}`}
            >
              Book details
              <svg
                className="h-3.5 w-3.5 transition-transform group-open/details:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>

            <BookMetadata
              book={book}
              fields={["publisher", "language", "isbn", "editions"]}
              className="mt-1"
            />
          </details>
        )}
      </div>
    </article>
  );
}

export default BookCard;
