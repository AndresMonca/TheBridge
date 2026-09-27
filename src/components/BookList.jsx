import BookCard from "./BookCard.jsx";

function BookList({ books, favorites, onToggleFavorite }) {
  if (books.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          No books found
        </h2>

        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          Try another title, author, or keyword.
        </p>
      </div>
    );
  }

  return (
    <section
      className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
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
