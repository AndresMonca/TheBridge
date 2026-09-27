function MyBooksEmptyState({ activeFilter }) {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-xl font-black text-slate-950 dark:text-white">
        No {activeFilter.toLowerCase()} books
      </h2>

      <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        Try another filter or add a new book to your library.
      </p>
    </div>
  );
}

export default MyBooksEmptyState;
