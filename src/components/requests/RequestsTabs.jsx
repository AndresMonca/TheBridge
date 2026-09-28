import { focusRing } from "../../styles/ui.js";

function RequestsTabs({ activeTab, counts, onChange }) {
  const tabs = ["received", "sent"];

  const handleKeyDown = (event) => {
    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex = null;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    }

    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    onChange(tabs[nextIndex]);
  };

  return (
    <div
      role="tablist"
      aria-label="Request categories"
      onKeyDown={handleKeyDown}
      className="inline-flex rounded-xl bg-surface-muted p-1"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        const label = tab === "received" ? "Received" : "Sent";

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${focusRing} ${
              isActive
                ? "bg-surface font-semibold text-ink shadow-sm"
                : "font-medium text-ink-muted hover:text-ink"
            }`}
          >
            {label}{" "}
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                isActive ? "bg-wine-soft text-wine-ink" : "bg-surface text-ink-muted"
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default RequestsTabs;
