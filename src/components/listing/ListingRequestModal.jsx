import { useState } from "react";
import { useDialogFocus } from "../../hooks/useDialogFocus.js";
import ExchangeBookOptions from "./ExchangeBookOptions.jsx";
import {
  getListingOfferRows,
  loadAvailableExchangeBooks,
} from "../../services/listingRequest.js";
import {
  buttonPrimary,
  buttonSecondary,
  eyebrow,
  focusRing,
  notice,
} from "../../styles/ui.js";

function ListingRequestModal({ listing, open, onClose, onSent }) {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [error, setError] = useState("");
  const { dialogRef, handleKeyDown } = useDialogFocus(open, onClose);

  if (!open) {
    return null;
  }

  const availableBooks =
    listing.modality === "Exchange" ? loadAvailableExchangeBooks() : [];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (listing.modality === "Exchange" && !selectedBookId) {
      setError("Select one of your available books to continue.");
      return;
    }

    onSent();
    onClose();
  };

  const handleBookChange = (bookId) => {
    setSelectedBookId(bookId);
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#1B0C12]/55 p-4 backdrop-blur-[2px]"
      role="presentation"
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-dialog-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface-raised p-6 shadow-2xl focus:outline-none sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={eyebrow}>
              Simulated request
            </p>

            <h2
              id="request-dialog-title"
              className="mt-2 text-2xl font-bold tracking-tight text-ink"
            >
              Request {listing.modality}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Review the listing before sending your request to {listing.owner}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close request dialog"
            className={`-mr-2 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xl text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink ${focusRing}`}
          >
            ×
          </button>
        </div>

        <dl className="mt-6 divide-y divide-line border-y border-line">
          {getListingOfferRows(listing).map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                {row.label}
              </dt>
              <dd className="text-right text-sm font-semibold text-ink">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <form onSubmit={handleSubmit}>
          {listing.modality === "Exchange" && (
            <ExchangeBookOptions
              books={availableBooks}
              selectedBookId={selectedBookId}
              error={error}
              onChange={handleBookChange}
            />
          )}

          <p className={`mt-6 text-xs ${notice.info}`}>
            Prototype only: this request is simulated. No message, payment, or
            transaction will be sent.
          </p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className={buttonSecondary}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                listing.modality === "Exchange" && availableBooks.length === 0
              }
              className={buttonPrimary}
            >
              Send request
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ListingRequestModal;
