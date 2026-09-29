import { inputBase } from "../../styles/ui.js";

function ListingSearchField({ value, onChange }) {
  return (
    <>
      <label htmlFor="listing-search" className="sr-only">
        Search listings
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-subtle"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="listing-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by title, author, genre, or ISBN"
          className={`${inputBase} h-14 pl-[3.25rem] shadow-card`}
        />
      </div>
    </>
  );
}

export default ListingSearchField;
