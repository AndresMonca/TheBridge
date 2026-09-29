import { findListingById } from "../../services/listingsStorage.js";
import {
  getRequestStatusMessage,
  requestStatusMeta,
} from "../../services/requestStatus.js";
import { card } from "../../styles/ui.js";
import RequestActions from "./RequestActions.jsx";
import RequestSummary from "./RequestSummary.jsx";

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
      <RequestSummary
        title={title}
        author={author}
        modality={modality}
        cover={cover}
        meta={meta}
        counterpartLabel={counterpartLabel}
      />

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
          <RequestActions
            onAccept={() => onStatusChange(request.id, "Accepted")}
            onReject={() => onStatusChange(request.id, "Rejected")}
          />
        )}

        <p className="mt-3 text-xs leading-5 text-ink-muted">
          {getRequestStatusMessage(request)}
        </p>
      </div>
    </article>
  );
}

export default RequestCard;
