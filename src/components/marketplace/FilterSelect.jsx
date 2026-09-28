import { ALL_OPTION } from "../../services/listingFilters.js";
import { selectField } from "../../styles/ui.js";
import SelectChevron from "../SelectChevron.jsx";

function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-ink-muted"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={selectField}
        >
          <option value={ALL_OPTION}>All</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>
    </div>
  );
}

export default FilterSelect;
