import { Link } from "react-router-dom";
import { badge, buttonSecondary, textLink, tone } from "../../styles/ui.js";

function ActivityNote({ book }) {
  const isPending = book.activityStatus.toLowerCase().includes("pending");

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
      <span className={`${badge} ${isPending ? tone.amber : tone.plum}`}>
        {book.activityStatus}
      </span>
      {book.activityWith && <span>with {book.activityWith}</span>}
    </p>
  );
}

function MyBookStatusAction({ book }) {
  if (book.status === "Available") {
    if (book.activityStatus) {
      return <ActivityNote book={book} />;
    }

    return (
      <Link
        to={`/create-listing?book=${encodeURIComponent(book.id)}`}
        className={`w-full ${buttonSecondary}`}
      >
        Create Listing
      </Link>
    );
  }

  if (book.status === "Published") {
    return (
      <div className="space-y-2">
        <p className="text-sm text-ink-muted">
          Listed as {book.listingModality || "listing"} ·{" "}
          <Link to="/marketplace" className={textLink}>
            View Marketplace
          </Link>
        </p>
        {book.activityStatus && <ActivityNote book={book} />}
      </div>
    );
  }

  if (book.status === "Loaned") {
    return (
      <p className="text-sm text-ink-muted">
        Loaned to{" "}
        <span className="font-semibold text-ink">
          {book.loanedTo || "Member"}
        </span>
      </p>
    );
  }

  return null;
}

export default MyBookStatusAction;
