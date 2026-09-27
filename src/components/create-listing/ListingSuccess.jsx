import { Link } from "react-router-dom";
import { formatListingPrice } from "../../services/listingValidation.js";

function SummaryRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="text-sm font-extrabold text-slate-950 sm:text-right dark:text-white">
        {value}
      </dd>
    </div>
  );
}

function ListingSuccess({ book, modality, values }) {
  return (
    <section className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-900/60 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-2xl font-black text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          ✓
        </span>

        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            Listing published!
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here is a summary of your listing.
          </p>
        </div>
      </div>

      <dl className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
        <SummaryRow
          label="Book"
          value={`${book.title} — ${book.author || "Unknown author"}`}
        />
        <SummaryRow label="Modality" value={modality} />

        {modality === "Exchange" && (
          <SummaryRow
            label="Desired book"
            value={values.desiredBook.trim() || "Open to offers"}
          />
        )}

        {modality === "Loan" && (
          <SummaryRow label="Duration" value={values.loanDuration} />
        )}

        {modality === "Rental" && (
          <>
            <SummaryRow
              label="Price"
              value={formatListingPrice(values.rentalPrice)}
            />
            <SummaryRow
              label="Duration"
              value={values.rentalDuration}
            />
          </>
        )}

        {modality === "Sale" && (
          <SummaryRow
            label="Price"
            value={formatListingPrice(values.salePrice)}
          />
        )}
      </dl>

      <p className="mt-4 rounded-2xl bg-indigo-50 px-4 py-3 text-xs font-semibold leading-5 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300">
        Prototype only: this listing is simulated and nothing has been saved.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          to="/my-books"
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-extrabold text-slate-700 transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          Back to My Books
        </Link>

        <Link
          to="/listing/book-01"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950"
        >
          View Listing →
        </Link>
      </div>
    </section>
  );
}

export default ListingSuccess;
