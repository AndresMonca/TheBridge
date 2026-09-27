import { Link } from "react-router-dom";

function MyBookStatusAction({ book }) {
  if (book.status === "Available") {
    return (
      <Link
        to={`/create-listing?book=${encodeURIComponent(book.id)}`}
        className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
      >
        Create Listing
      </Link>
    );
  }

  if (book.status === "Published") {
    return (
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-900/60 dark:bg-indigo-950/30">
        <p className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
          Listed as {book.listingModality || "listing"}
        </p>

        <Link
          to="/marketplace"
          className="mt-2 inline-block text-sm font-extrabold text-indigo-700 underline-offset-4 hover:underline dark:text-indigo-300"
        >
          View Marketplace
        </Link>
      </div>
    );
  }

  if (book.status === "Loaned") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-800/60 dark:bg-amber-950/30">
        <p className="text-xs font-extrabold text-amber-700 dark:text-amber-300">
          Loaned to
        </p>

        <p className="mt-1 text-sm font-black text-amber-950 dark:text-amber-200">
          {book.loanedTo || "Student"}
        </p>
      </div>
    );
  }

  return null;
}

export default MyBookStatusAction;
