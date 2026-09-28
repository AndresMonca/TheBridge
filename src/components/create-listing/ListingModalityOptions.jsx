import { listingModalities } from "../../data/createListingData.js";
import { fieldError } from "../../styles/ui.js";

const MODALITY_ICON_PATHS = {
  Exchange: "M7 7h11l-3-3M17 17H6l3 3",
  Loan: "M3 12a9 9 0 1 0 2.64-6.36L3 8M3 3v5h5",
  Rental: "M8 3v3M16 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  Sale: "M3 12V4h8l9 9-8 8-9-9ZM7.5 7.5h.01",
};

function ListingModalityOptions({ value, onChange, error }) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold tracking-tight text-ink">
        How would you like to share it?
      </legend>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {listingModalities.map((option) => (
          <label key={option.id} className="group relative block cursor-pointer">
            <input
              type="radio"
              name="modality"
              value={option.id}
              checked={value === option.id}
              onChange={(event) => onChange(event.target.value)}
              className="peer sr-only"
            />

            <span className="flex h-full items-start gap-3.5 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong peer-checked:border-wine peer-checked:bg-wine-soft peer-focus-visible:ring-2 peer-focus-visible:ring-wine peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-muted transition-colors group-has-[:checked]:bg-wine group-has-[:checked]:text-white"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={MODALITY_ICON_PATHS[option.id]} />
                </svg>
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-ink">
                  {option.label}
                </span>

                <span className="mt-0.5 block text-sm leading-5 text-ink-muted">
                  {option.description}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-line-strong transition-all group-has-[:checked]:border-[5px] group-has-[:checked]:border-wine"
              />
            </span>
          </label>
        ))}
      </div>

      {error && <p className={fieldError}>{error}</p>}
    </fieldset>
  );
}

export default ListingModalityOptions;
