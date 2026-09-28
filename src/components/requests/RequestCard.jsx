import { findListingById } from "../../services/listingsStorage.js";
import {
  getRequestStatusMessage,
  requestStatusMeta,
} from "../../services/requestStatus.js";
import {
  badge,
  buttonPrimarySm,
  buttonSecondarySm,
  card,
} from "../../styles/ui.js";

function RequestCard({ request, myBook, offeredBook, onStatusChange }) {
  const listing = findListingById(request.listingId);
  const meta = requestStatusMeta[request.status];

  const source = myBook || listing;
  const title = source?.title || "Listing no longer available";
  const author = source?.author || "";
  const modality = myBook?.listingModality || listing?.modality || "";
  const cover = source?.cover || "";
  const counterpartLabel =
    request.direction === "received"
      ? `From ${request.counterpart}`
      : `To ${request.counterpart}`;

  const canRespond =
    request.direction === "received" && request.status === "Pending";

  return (
    <article className={`p-4 sm:p-5 ${card}`}>
      <div className="flex gap-4">
        <div className="h-20 w-14 shrink-0 overflow-hidden rounded-md bg-surface-muted">
          {cover && (
            <img
              src={cover}
              alt={`Cover of ${title}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-ink">
                {title}
              </p>

              <p className="truncate text-sm text-ink-muted">
                {author} · {modality}
              </p>
            </div>

            <span className={`shrink-0 ${badge} ${meta.classes}`}>
              {meta.label}
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold text-wine-ink">
            {counterpartLabel}
          </p>
        </div>
      </div>

      <div className="mt-3 sm:pl-[4.5rem]">
        <p className="text-sm leading-6 text-ink">{request.note}</p>

        {myBook && (
          <p className="mt-2 text-xs text-ink-muted">
            Your copy in My Books · {myBook.condition}
          </p>
        )}

        {offeredBook && (
          <p className="mt-2 text-xs text-ink-muted">
            You offered your copy of{" "}
            <span className="font-semibold text-ink">{offeredBook.title}</span>
          </p>
        )}

        {canRespond && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onStatusChange(request.id, "Accepted")}
              className={buttonPrimarySm}
            >
              Accept
            </button>

            <button
              type="button"
              onClick={() => onStatusChange(request.id, "Rejected")}
              className={buttonSecondarySm}
            >
              Reject
            </button>
          </div>
        )}

        <p className="mt-3 text-xs leading-5 text-ink-muted">
          {getRequestStatusMessage(request)}
        </p>
      </div>
    </article>
  );
}

export default RequestCard;
