import { eyebrow, focusRing } from "../../styles/ui.js";

function QuickViewHeader({ onClose }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-6">
      <p className={eyebrow}>Quick view</p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close quick view"
        className={`-mr-2 grid h-10 w-10 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink ${focusRing}`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </header>
  );
}

export default QuickViewHeader;
