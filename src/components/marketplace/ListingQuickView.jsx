import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDialogFocus } from "../../hooks/useDialogFocus.js";
import {
  getListingOfferRows,
  getRequestCtaLabel,
} from "../../services/listingRequest.js";
import { hasActiveSentRequest } from "../../services/requestsStorage.js";
import {
  badge,
  buttonPrimary,
  buttonSecondary,
  buttonSuccess,
  coverFrame,
  eyebrow,
  focusRing,
  modalityTone,
} from "../../styles/ui.js";
import ListingRequestModal from "../listing/ListingRequestModal.jsx";

function DetailRow({ label, value, strong = false }) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd
        className={`text-right text-sm text-ink ${strong ? "font-semibold" : "font-medium"}`}
      >
        {value}
      </dd>
    </div>
  );
}

function ListingQuickView({ listing, onClose }) {
  const open = Boolean(listing);
  const [displayed, setDisplayed] = useState(listing);
  const [requestOpen, setRequestOpen] = useState(false);
  const [sentListingId, setSentListingId] = useState(null);
  const { dialogRef, handleKeyDown } = useDialogFocus(open, onClose);

  if (listing && listing !== displayed) {
    setDisplayed(listing);
  }

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const requestSent =
    Boolean(displayed) &&
    (sentListingId === displayed.id || hasActiveSentRequest(displayed.id));

  return (
    <>
      <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
        <div
          aria-hidden="true"
          onClick={onClose}
          className={`absolute inset-0 bg-[#1B0C12]/30 backdrop-blur-sm transition-[opacity,visibility] duration-300 motion-reduce:transition-none dark:bg-black/55 ${
            open ? "" : "invisible opacity-0"
          }`}
        />

        <section
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          style={{
            transitionProperty: open ? "transform" : "transform, visibility",
          }}
          className={`absolute inset-y-0 right-0 flex w-full flex-col bg-surface shadow-2xl duration-300 ease-out focus:outline-none motion-reduce:duration-0 sm:w-[85vw] sm:border-l sm:border-line md:w-[30rem] lg:w-[32rem] ${
            open ? "" : "invisible translate-x-full"
          }`}
        >
          {displayed && (
            <>
              <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-6">
                <p className={eyebrow}>Quick view</p>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close quick view"
                  className={`-mr-2 grid h-10 w-10 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink ${focusRing}`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
                <div className="flex gap-5">
                  <div
                    className={`aspect-[3/4] w-28 shrink-0 shadow-card sm:w-32 ${coverFrame}`}
                  >
                    <img
                      src={displayed.cover}
                      alt={`Cover of ${displayed.title}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 pt-1">
                    <h2
                      id="quick-view-title"
                      className="text-2xl font-bold leading-tight tracking-tight text-ink"
                    >
                      {displayed.title}
                    </h2>

                    <p className="mt-1 text-[15px] text-ink-muted">
                      {displayed.author}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span
                        className={`${badge} ${modalityTone[displayed.modality] ?? ""}`}
                      >
                        {displayed.modality}
                      </span>
                      <span className={`${badge} bg-surface-muted text-ink-muted`}>
                        {displayed.condition}
                      </span>
                    </div>
                  </div>
                </div>

                <dl className="mt-6 divide-y divide-line rounded-2xl bg-surface-muted px-4 py-1">
                  {getListingOfferRows(displayed).map((row) => (
                    <DetailRow
                      key={row.label}
                      label={row.label}
                      value={row.value}
                      strong
                    />
                  ))}
                </dl>

                {displayed.description && (
                  <p className="mt-6 text-[15px] leading-7 text-ink-muted">
                    {displayed.description}
                  </p>
                )}

                <dl className="mt-6 divide-y divide-line border-y border-line">
                  <DetailRow label="Genre" value={displayed.genre} />
                  <DetailRow label="Year" value={displayed.year} />
                  <DetailRow label="Publisher" value={displayed.publisher} />
                  <DetailRow label="ISBN" value={displayed.isbn} />
                </dl>

                <div className="mt-6 flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-wine-soft text-sm font-semibold text-wine-ink"
                    aria-hidden="true"
                  >
                    {displayed.owner?.[0]}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs text-ink-muted">Shared by</p>
                    <p className="text-sm font-semibold text-ink">
                      {displayed.owner}
                    </p>
                    {displayed.university && (
                      <p className="truncate text-xs text-ink-muted">
                        {displayed.university}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <footer className="flex flex-col-reverse gap-3 border-t border-line px-5 py-4 sm:flex-row sm:px-6">
                <Link
                  to={`/listing/${displayed.id}`}
                  className={`sm:flex-1 ${buttonSecondary}`}
                >
                  View full details
                </Link>

                <button
                  type="button"
                  onClick={() => setRequestOpen(true)}
                  disabled={requestSent}
                  className={`sm:flex-1 ${requestSent ? buttonSuccess : buttonPrimary}`}
                >
                  {requestSent
                    ? "✓ Request sent"
                    : getRequestCtaLabel(displayed.modality)}
                </button>

                <p className="sr-only" aria-live="polite">
                  {requestSent ? "Your simulated request was sent." : ""}
                </p>
              </footer>
            </>
          )}
        </section>
      </div>

      {displayed && (
        <ListingRequestModal
          key={displayed.id}
          listing={displayed}
          open={requestOpen}
          onClose={() => setRequestOpen(false)}
          onSent={() => setSentListingId(displayed.id)}
        />
      )}
    </>
  );
}

export default ListingQuickView;
