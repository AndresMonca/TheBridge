import { bookConditions } from "../../data/addBookData.js";

function BookConditionOptions({ value, onChange, hasError }) {
  return (
    <fieldset>
      <legend className="text-sm font-extrabold text-slate-950 dark:text-white">
        Condition
      </legend>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {bookConditions.map((condition) => (
          <label
            key={condition}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-300 has-[:checked]:border-indigo-400 has-[:checked]:bg-indigo-50 dark:border-slate-700 dark:bg-slate-950 dark:has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-950/40"
          >
            <input
              type="radio"
              name="condition"
              value={condition}
              checked={value === condition}
              onChange={(event) => onChange(event.target.value)}
              aria-invalid={hasError}
              className="h-4 w-4 accent-indigo-600"
            />

            <span className="text-sm font-extrabold">
              {condition}
            </span>
          </label>
        ))}
      </div>

      {hasError && (
        <p className="mt-2 text-sm font-bold text-red-600 dark:text-red-400">
          Select the condition of your copy.
        </p>
      )}
    </fieldset>
  );
}

export default BookConditionOptions;
