import { bookConditions } from "../../data/addBookData.js";
import { fieldError } from "../../styles/ui.js";

function BookConditionOptions({ value, onChange, hasError }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">Condition</legend>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {bookConditions.map((condition) => (
          <label
            key={condition}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-line-strong has-[:checked]:border-wine has-[:checked]:bg-wine-soft has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-wine has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-canvas"
          >
            <input
              type="radio"
              name="condition"
              value={condition}
              checked={value === condition}
              onChange={(event) => onChange(event.target.value)}
              aria-invalid={hasError}
              className="h-4 w-4 accent-wine"
            />

            <span className="text-sm font-medium text-ink">{condition}</span>
          </label>
        ))}
      </div>

      {hasError && (
        <p className={fieldError}>Select the condition of your copy.</p>
      )}
    </fieldset>
  );
}

export default BookConditionOptions;
