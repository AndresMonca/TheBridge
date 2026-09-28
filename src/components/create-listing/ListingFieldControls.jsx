import { listingDurations } from "../../data/createListingData.js";
import {
  fieldError,
  fieldLabel,
  inputField,
  selectFieldLg,
} from "../../styles/ui.js";
import SelectChevron from "../SelectChevron.jsx";

export function FieldError({ message }) {
  return message ? (
    <p className={fieldError}>
      {message}
    </p>
  ) : null;
}

export function DurationSelect({ name, label, value, onChange, error }) {
  return (
    <div>
      <label
        htmlFor={name}
        className={fieldLabel}
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          aria-invalid={Boolean(error)}
          className={selectFieldLg}
        >
          <option value="">Select a duration</option>

          {listingDurations.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>

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
        className={fieldLabel}
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-muted">
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
          className={`${inputField} pl-14`}
        />
      </div>

      <FieldError message={error} />
    </div>
  );
}
