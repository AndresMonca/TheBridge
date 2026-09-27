function LoadingState() {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400"
        aria-hidden="true"
      />

      <p className="mt-5 text-sm font-extrabold text-slate-700 dark:text-slate-200">
        Loading books...
      </p>

      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        Searching Open Library for matching results.
      </p>
    </div>
  );
}

export default LoadingState;
