import { badge } from "../../styles/ui.js";

function RequestSummary({ title, author, modality, cover, meta, counterpartLabel }) {
  return (
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
  );
}

export default RequestSummary;
