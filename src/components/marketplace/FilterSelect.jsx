import { ALL_OPTION } from "../../services/listingFilters.js";

function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      >
        <option value={ALL_OPTION}>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSelect;
