import { useEffect, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import BookList from "./components/BookList.jsx";
import ErrorState from "./components/ErrorState.jsx";
import FavoritesSection from "./components/FavoritesSection.jsx";
import LoadingState from "./components/LoadingState.jsx";
import { readStoredFavorites } from "./services/favorites.js";
import { normalizeOpenLibraryBooks } from "./services/openLibrary.js";

const KEY = "thebridge:favorites";
const DEFAULT = "computer science";
const QUICK = ["Algorithms", "Calculus", "Physics", "Databases"];

const validateSearch = (value) => {
  const query = value.trim();
  if (!query) return "Enter a title, author, or keyword.";
  return query.length < 3 ? "Use at least 3 characters." : "";
};

async function fetchBooks(query, signal) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Open Library returned ${response.status}.`);
  }

  return normalizeOpenLibraryBooks((await response.json()).docs);
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [activeQuery, setActiveQuery] = useState(DEFAULT);
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(() =>
    readStoredFavorites(KEY),
  );
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadInitialBooks = async () => {
      try {
        setBooks(await fetchBooks(DEFAULT, controller.signal));
        setStatus("success");
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Open Library is unavailable.");
          setStatus("error");
        }
      }
    };

    loadInitialBooks();

    return () => controller.abort();
  }, []);

  const runSearch = async (query) => {
    setActiveQuery(query);
    setStatus("loading");
    setError("");

    try {
      setBooks(await fetchBooks(query));
      setStatus("success");
      return true;
    } catch (requestError) {
      setError(requestError.message || "Open Library is unavailable.");
      setStatus("error");
      return false;
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setSearchError(value ? validateSearch(value) : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = validateSearch(searchInput);
    setSearchError(message);

    if (message) return;

    if (await runSearch(searchInput.trim())) {
      setSearchInput("");
      setSearchError("");
    }
  };

  const inlineError = searchError && (
    <p className="mt-2 text-xs font-bold text-rose-600" role="alert">
      {searchError}
    </p>
  );

  const searchField = (
    <input
      id="book-search"
      type="search"
      value={searchInput}
      onChange={handleChange}
      placeholder="Search by title, author, or keyword"
      aria-invalid={Boolean(searchError)}
      className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
    />
  );

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (book) => {
    setFavorites((current) =>
      current.some((favorite) => favorite.id === book.id)
        ? current.filter((favorite) => favorite.id !== book.id)
        : [...current, book],
    );
  };

  return (
    <AppShell
      activePage="marketplace"
      title="Marketplace"
      subtitle="Discover books from the university community"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              Open Library search
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Find your next book
            </h1>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
              Search public bibliographic data and save the books that interest
              you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6"
              role="search"
              noValidate
            >
              <label htmlFor="book-search" className="sr-only">
                Search books
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="relative flex-1">
                  <svg
                    className="pointer-events-none absolute left-4 top-6 h-5 w-5 -translate-y-1/2 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>

                  {searchField}
                  {inlineError}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              <QuickSearches onSearch={runSearch} />
            </div>
          </div>

          <div className="mt-6">
            <Results
              status={status}
              error={error}
              books={books}
              favorites={favorites}
              onRetry={() => runSearch(activeQuery)}
              onToggle={toggleFavorite}
            />
          </div>
        </section>

        <aside>
          <FavoritesSection
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </aside>
      </div>
    </AppShell>
  );
}

function Results({ status, error, books, favorites, onRetry, onToggle }) {
  if (status === "loading") return <LoadingState />;

  if (status === "error") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  return (
    <BookList
      books={books}
      favorites={favorites}
      onToggleFavorite={onToggle}
    />
  );
}

function QuickSearches({ onSearch }) {
  return QUICK.map((query) => (
    <button
      key={query}
      type="button"
      onClick={() => onSearch(query)}
      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
    >
      {query}
    </button>
  ));
}

export default App;
