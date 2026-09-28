import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import MyBookCard from "../components/my-books/MyBookCard.jsx";
import MyBooksEmptyState from "../components/my-books/MyBooksEmptyState.jsx";
import MyBooksFilters from "../components/my-books/MyBooksFilters.jsx";
import { shuffleArray } from "../services/discovery.js";
import { MY_BOOKS_EVENT } from "../services/librarySeed.js";
import { loadMyBooksWithActivity } from "../services/myBooksStorage.js";
import { REQUESTS_EVENT } from "../services/requestsStorage.js";
import { buttonPrimary, eyebrow, pageLead, pageTitle } from "../styles/ui.js";

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
  const [books, setBooks] = useState(loadMyBooksWithActivity);
  const [displayOrder] = useState(() =>
    shuffleArray(books.map((book) => book.id)),
  );

  useEffect(() => {
    const refreshBooks = () => setBooks(loadMyBooksWithActivity());
    const events = [MY_BOOKS_EVENT, REQUESTS_EVENT, "thebridge:book-added", "storage"];

    events.forEach((name) => window.addEventListener(name, refreshBooks));

    return () =>
      events.forEach((name) => window.removeEventListener(name, refreshBooks));
  }, []);

  const orderedBooks = useMemo(() => {
    const position = new Map(displayOrder.map((id, index) => [id, index]));
    return [...books].sort(
      (a, b) => (position.get(a.id) ?? -1) - (position.get(b.id) ?? -1),
    );
  }, [books, displayOrder]);

  const counts = useMemo(() => countBooks(books), [books]);

  const filteredBooks = useMemo(
    () =>
      activeFilter === "All"
        ? orderedBooks
        : orderedBooks.filter((book) => book.status === activeFilter),
    [activeFilter, orderedBooks],
  );

  return (
    <AppShell
      activePage="my-books"
      title="My Books"
      subtitle="Manage the books in your personal library"
    >
      <section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={eyebrow}>Personal library</p>
            <h1 className={`mt-3 ${pageTitle}`}>My Books</h1>
            <p className={`mt-2 max-w-xl ${pageLead}`}>
              Track available, published, and loaned books from one place.
            </p>
          </div>

          <Link to="/add-book" className={`w-full sm:w-auto ${buttonPrimary}`}>
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            Add book
          </Link>
        </div>

        <MyBooksFilters
          activeFilter={activeFilter}
          counts={counts}
          onChange={setActiveFilter}
        />

        {filteredBooks.length ? (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
