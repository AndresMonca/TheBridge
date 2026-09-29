import { focusRing } from "../../styles/ui.js";
import BookMetadata from "./BookMetadata.jsx";

function BookDetailsDisclosure({ book }) {
  return (
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
  );
}

export default BookDetailsDisclosure;
