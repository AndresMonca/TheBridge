import { listingModalities } from "../../data/createListingData.js";

function ListingModalityOptions({ value, onChange, error }) {
  return (
    <fieldset>
      <legend className="text-sm font-extrabold text-slate-950 dark:text-white">
        How do you want to share this book?
      </legend>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {listingModalities.map((option) => (
          <label
            key={option.id}
            className="relative block cursor-pointer"
          >
            <input
              type="radio"
              name="modality"
              value={option.id}
              checked={value === option.id}
              onChange={(event) => onChange(event.target.value)}
              className="peer sr-only"
            />

            <span className="flex h-full items-start gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 transition hover:border-indigo-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-focus-visible:ring-4 peer-focus-visible:ring-blue-500/25 dark:border-slate-700 dark:bg-slate-950 dark:peer-checked:border-indigo-400 dark:peer-checked:bg-indigo-950/40">
              <span aria-hidden="true" className="text-2xl leading-none">
                {option.icon}
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-extrabold text-slate-950 dark:text-white">
                  {option.label}
                </span>

                <span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {option.description}
                </span>
              </span>
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm font-bold text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default ListingModalityOptions;
