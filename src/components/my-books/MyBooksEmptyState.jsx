function MyBooksEmptyState({ activeFilter }) {
  return (
    <div className="mt-8 rounded-2xl bg-surface-muted px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-ink">
        No {activeFilter.toLowerCase()} books
      </h2>

      <p className="mt-2 text-sm text-ink-muted">
        Try another filter or add a new book to your library.
      </p>
    </div>
  );
}

export default MyBooksEmptyState;
