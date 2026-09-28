import { Link } from "react-router-dom";
import { buttonSecondary, textLink } from "../../styles/ui.js";

function MyBookStatusAction({ book }) {
  if (book.status === "Available") {
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
      <p className="text-sm text-ink-muted">
        Listed as {book.listingModality || "listing"} ·{" "}
        <Link to="/marketplace" className={textLink}>
          View Marketplace
        </Link>
      </p>
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
