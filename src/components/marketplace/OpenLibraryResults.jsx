import BookList from "../BookList.jsx";
import ErrorState from "../ErrorState.jsx";
import LoadingState from "../LoadingState.jsx";

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
          className="mb-5 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-extrabold text-amber-900 dark:text-amber-200">
              Showing saved data
            </p>
            <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-300">
              Open Library could not be reached. These results were saved on{" "}
              {formatSavedAt(savedAt)}.
            </p>
          </div>

          <button
            type="button"
            onClick={onRetry}
            className="w-fit rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-extrabold text-amber-900 transition hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-500/20 dark:border-amber-800 dark:bg-transparent dark:text-amber-200"
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
