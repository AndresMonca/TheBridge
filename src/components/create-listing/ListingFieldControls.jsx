import { listingDurations } from "../../data/createListingData.js";

const inputClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

export function FieldError({ message }) {
  return message ? (
    <p className="mt-2 text-sm font-bold text-rose-600 dark:text-rose-400">
      {message}
    </p>
  ) : null;
}

export function DurationSelect({ name, label, value, onChange, error }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-extrabold text-slate-800 dark:text-slate-100"
      >
        {label}
      </label>

      <select
        id={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        aria-invalid={Boolean(error)}
        className={inputClass}
      >
        <option value="">Select a duration</option>

        {listingDurations.map((duration) => (
          <option key={duration} value={duration}>
            {duration}
          </option>
        ))}
      </select>

      <FieldError message={error} />
    </div>
  );
}

export function PriceInput({
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-extrabold text-slate-800 dark:text-slate-100"
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
          COP
        </span>

        <input
          id={name}
          type="number"
          inputMode="numeric"
          min="0"
          step="500"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          aria-invalid={Boolean(error)}
          className={`${inputClass} pl-14`}
        />
      </div>

      <FieldError message={error} />
    </div>
  );
}

export { inputClass };
