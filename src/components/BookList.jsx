import BookCard from "./BookCard.jsx";

function BookList({ books, favorites, onToggleFavorite }) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl bg-surface-muted px-6 py-16 text-center">
        <h2 className="text-lg font-semibold text-ink">
          No books found
        </h2>

        <p className="mt-2 text-sm text-ink-muted">
          Try another title, author, or keyword.
        </p>
      </div>
    );
  }

  return (
    <section
      className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3"
      aria-label="Book results"
    >
      {books.map((book) => {
        const isFavorite = favorites.some(
          (favorite) => favorite.id === book.id,
        );

        return (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </section>
  );
}

export default BookList;
