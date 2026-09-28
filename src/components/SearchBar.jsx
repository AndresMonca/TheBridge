import { buttonPrimaryLg, inputBase } from "../styles/ui.js";

function SearchBar({ value, onChange, onSubmit, disabled = false }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row"
      role="search"
    >
      <div className="relative flex-1">
        <label htmlFor="book-search" className="sr-only">
          Search books
        </label>

        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-subtle"
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
          id="book-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by title, author, or keyword"
          autoComplete="off"
          className={`${inputBase} h-12 pl-12`}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className={buttonPrimaryLg}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
