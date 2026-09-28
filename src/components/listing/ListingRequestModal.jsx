import { useState } from "react";
import { useDialogFocus } from "../../hooks/useDialogFocus.js";
import ExchangeBookOptions from "./ExchangeBookOptions.jsx";
import {
  getListingOfferRows,
  loadAvailableExchangeBooks,
} from "../../services/listingRequest.js";

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
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-dialog-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl focus:outline-none dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
              Simulated request
            </p>

            <h2
              id="request-dialog-title"
              className="mt-2 text-2xl font-black text-slate-950 dark:text-white"
            >
              Request {listing.modality}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Review the listing before sending your request to {listing.owner}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close request dialog"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xl font-bold text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ×
          </button>
        </div>

        <dl className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-700">
          {getListingOfferRows(listing).map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 px-4 py-3"
            >
              <dt className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
                {row.label}
              </dt>
              <dd className="text-right text-sm font-extrabold text-slate-950 dark:text-white">
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

          <p className="mt-5 rounded-2xl bg-indigo-50 px-4 py-3 text-xs font-semibold leading-5 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300">
            Prototype only: this request is simulated. No message, payment, or
            transaction will be sent.
          </p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-2xl border border-slate-200 px-5 text-sm font-extrabold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                listing.modality === "Exchange" && availableBooks.length === 0
              }
              className="h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
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
