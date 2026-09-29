import { chipSm } from "../../styles/ui.js";

const QUICK_SEARCHES = ["Algorithms", "Calculus", "Physics", "Databases"];

function QuickSearches({ onSearch }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs text-ink-muted">Try:</span>
      {QUICK_SEARCHES.map((query) => (
        <button
          key={query}
          type="button"
          onClick={() => onSearch(query)}
          className={chipSm}
        >
          {query}
        </button>
      ))}
    </div>
  );
}

export default QuickSearches;
