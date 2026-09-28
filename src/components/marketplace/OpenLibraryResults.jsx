import BookList from "../BookList.jsx";
import ErrorState from "../ErrorState.jsx";
import LoadingState from "../LoadingState.jsx";
import { buttonSecondarySm, notice } from "../../styles/ui.js";

function formatSavedAt(savedAt) {
  return new Date(savedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function OpenLibraryResults({
  status,
  error,
  books,
  favorites,
  savedAt,
  onRetry,
  onToggle,
}) {
  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "error") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  return (
    <>
      {savedAt && (
        <div
          role="status"
          className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${notice.warning}`}
        >
          <div>
            <p className="text-sm font-semibold">
              Showing saved data
            </p>
            <p className="mt-1 text-sm leading-6 opacity-90">
              Open Library could not be reached. These results were saved on{" "}
              {formatSavedAt(savedAt)}.
            </p>
          </div>

          <button
            type="button"
            onClick={onRetry}
            className={`w-fit shrink-0 ${buttonSecondarySm}`}
          >
            Try again
          </button>
        </div>
      )}

      <BookList books={books} favorites={favorites} onToggleFavorite={onToggle} />
    </>
  );
}

export default OpenLibraryResults;
