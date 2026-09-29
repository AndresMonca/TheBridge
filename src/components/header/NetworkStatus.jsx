function NetworkStatus({ isOnline }) {
  return (
    <div
      className="flex items-center gap-2 px-2 text-xs font-medium text-ink-muted"
      aria-live="polite"
      title={isOnline ? "Online" : "Offline"}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isOnline ? "bg-[#5E8C69]" : "bg-[#C08A3E]"
        }`}
        aria-hidden="true"
      />

      <span className="sr-only sm:not-sr-only">
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}

export default NetworkStatus;
