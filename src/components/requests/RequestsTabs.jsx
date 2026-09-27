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
      className="flex flex-wrap gap-2"
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
            className={`rounded-xl px-4 py-2 text-sm font-extrabold transition focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
              isActive
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            }`}
          >
            {label} {counts[tab]}
          </button>
        );
      })}
    </div>
  );
}

export default RequestsTabs;
