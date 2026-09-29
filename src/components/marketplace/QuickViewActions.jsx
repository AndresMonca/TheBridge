import { Link } from "react-router-dom";
import { getRequestCtaLabel } from "../../services/listingRequest.js";
import {
  buttonPrimary,
  buttonSecondary,
  buttonSuccess,
} from "../../styles/ui.js";

function QuickViewActions({ listing, requestSent, onRequest }) {
  return (
    <footer className="flex flex-col-reverse gap-3 border-t border-line px-5 py-4 sm:flex-row sm:px-6">
      <Link
        to={`/listing/${listing.id}`}
        className={`sm:flex-1 ${buttonSecondary}`}
      >
        View full details
      </Link>

      <button
        type="button"
        onClick={onRequest}
        disabled={requestSent}
        className={`sm:flex-1 ${requestSent ? buttonSuccess : buttonPrimary}`}
      >
        {requestSent
          ? "✓ Request sent"
          : getRequestCtaLabel(listing.modality)}
      </button>

      <p className="sr-only" aria-live="polite">
        {requestSent ? "Your simulated request was sent." : ""}
      </p>
    </footer>
  );
}

export default QuickViewActions;
