import { listings } from "../../data/listings.js";
import {
  getRequestStatusMessage,
  requestStatusMeta,
} from "../../services/requestStatus.js";

function RequestCard({ request, onStatusChange }) {
  const listing = listings.find((item) => item.id === request.listingId);
  const meta = requestStatusMeta[request.status];

  const title = listing?.title || "Listing no longer available";
  const author = listing?.author || "";
  const modality = listing?.modality || "";
  const cover = listing?.cover || "";
  const counterpartLabel =
    request.direction === "received"
      ? `From ${request.counterpart}`
      : `To ${request.counterpart}`;

  const canRespond =
    request.direction === "received" && request.status === "Pending";

  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="flex gap-4">
        <div className="h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
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
              <p className="truncate text-sm font-black text-slate-950 dark:text-white">
                {title}
              </p>

              <p className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                {author} · {modality}
              </p>
            </div>

            <span
              className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-extrabold ${meta.classes}`}
            >
              {meta.label}
            </span>
          </div>

          <p className="mt-2 text-xs font-extrabold text-indigo-600 dark:text-indigo-300">
            {counterpartLabel}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {request.note}
          </p>

          {canRespond && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onStatusChange(request.id, "Accepted")}
                className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
              >
                Accept
              </button>

              <button
                type="button"
                onClick={() => onStatusChange(request.id, "Rejected")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:border-rose-300 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                Reject
              </button>
            </div>
          )}

          <p className="mt-3 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">
            {getRequestStatusMessage(request)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default RequestCard;
