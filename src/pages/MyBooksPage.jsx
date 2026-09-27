import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import MyBookCard from "../components/my-books/MyBookCard.jsx";
import MyBooksEmptyState from "../components/my-books/MyBooksEmptyState.jsx";
import MyBooksFilters from "../components/my-books/MyBooksFilters.jsx";
import { loadMyBooks } from "../services/myBooksStorage.js";

function countBooks(books) {
  return books.reduce(
    (counts, book) => ({
      ...counts,
      All: counts.All + 1,
      [book.status]: (counts[book.status] || 0) + 1,
    }),
    { All: 0, Available: 0, Published: 0, Loaned: 0 },
  );
}

function MyBooksPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [books] = useState(loadMyBooks);

  const counts = useMemo(() => countBooks(books), [books]);

  const filteredBooks = useMemo(
    () =>
      activeFilter === "All"
        ? books
        : books.filter((book) => book.status === activeFilter),
    [activeFilter, books],
  );

  return (
    <AppShell
      activePage="my-books"
      title="My Books"
      subtitle="Manage the books in your personal library"
    >
      <section>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              Personal library
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              My Books
            </h1>
            <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
              Track available, published, and loaned books from one place.
            </p>
          </div>

          <Link
            to="/add-book"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            Add book
          </Link>
        </div>

        <MyBooksFilters
          activeFilter={activeFilter}
          counts={counts}
          onChange={setActiveFilter}
        />

        {filteredBooks.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <MyBookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <MyBooksEmptyState activeFilter={activeFilter} />
        )}
      </section>
    </AppShell>
  );
}

export default MyBooksPage;
