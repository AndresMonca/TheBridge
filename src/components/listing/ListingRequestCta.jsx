import { getRequestCtaLabel } from "../../services/listingRequest.js";
import { buttonPrimary, buttonSuccess } from "../../styles/ui.js";

function ListingRequestCta({ modality, requestSent, onRequest }) {
  return (
    <>
      <button
        type="button"
        onClick={onRequest}
        disabled={requestSent}
        className={`mt-8 w-full sm:w-auto sm:px-8 ${
          requestSent ? buttonSuccess : buttonPrimary
        }`}
      >
        {requestSent
          ? "✓ Request sent"
          : getRequestCtaLabel(modality)}
      </button>

      <p className="sr-only" aria-live="polite">
        {requestSent ? "Your simulated request was sent." : ""}
      </p>
    </>
  );
}

export default ListingRequestCta;
