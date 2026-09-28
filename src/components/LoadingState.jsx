function LoadingState() {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center rounded-2xl bg-surface-muted px-6 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-line border-t-wine"
        aria-hidden="true"
      />

      <p className="mt-5 text-sm font-semibold text-ink">Loading books...</p>

      <p className="mt-1 text-xs text-ink-muted">
        Searching Open Library for matching results.
      </p>
    </div>
  );
}

export default LoadingState;
