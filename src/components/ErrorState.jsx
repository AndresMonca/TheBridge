function ErrorState({ message, onRetry }) {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-rose-200 bg-rose-50 px-6 py-12 text-center dark:border-rose-500/20 dark:bg-rose-500/5"
      role="alert"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6M12 17h.01" />
        </svg>
      </div>

      <h2 className="mt-4 text-lg font-black text-slate-950 dark:text-white">
        We could not load the books
      </h2>

      <p className="mt-2 max-w-md text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">
        {message || "Please check your connection and try again."}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorState;
