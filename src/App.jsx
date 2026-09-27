import { useEffect, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import BookList from "./components/BookList.jsx";
import ErrorState from "./components/ErrorState.jsx";
import FavoritesSection from "./components/FavoritesSection.jsx";
import LoadingState from "./components/LoadingState.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { normalizeOpenLibraryBooks } from "./services/openLibrary.js";

const FAVORITES_STORAGE_KEY = "thebridge:favorites";
const DEFAULT_QUERY = "computer science";
const quickSearches = ["Algorithms", "Calculus", "Physics", "Databases"];

function readStoredFavorites() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]",
    );

    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState(DEFAULT_QUERY);
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(readStoredFavorites);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadBooks = async () => {
      setStatus("loading");
      setError("");

      try {
        const url = new URL("https://openlibrary.org/search.json");
        url.searchParams.set("q", activeQuery);
        url.searchParams.set("limit", "20");

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Open Library returned ${response.status}.`);
        }

        const data = await response.json();
        setBooks(normalizeOpenLibraryBooks(data.docs));
        setStatus("success");
      } catch (requestError) {
        if (requestError.name === "AbortError") {
          return;
        }

        setError(
          requestError.message ||
            "Open Library is temporarily unavailable. Please try again.",
        );
        setStatus("error");
      }
    };

    loadBooks();

    return () => {
      controller.abort();
    };
  }, [activeQuery, retryCount]);

  useEffect(() => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    );
  }, [favorites]);

  const handleSearch = () => {
    const nextQuery = searchInput.trim();

    if (!nextQuery) {
      return;
    }

    setActiveQuery(nextQuery);
    setSearchInput("");
  };

  const handleToggleFavorite = (book) => {
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (favorite) => favorite.id === book.id,
      );

      return alreadySaved
        ? currentFavorites.filter((favorite) => favorite.id !== book.id)
        : [...currentFavorites, book];
    });
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

            <div className="mt-6">
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                onSubmit={handleSearch}
                disabled={status === "loading"}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickSearches.map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => setActiveQuery(query)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-blue-300"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {status === "loading" && <LoadingState />}

            {status === "error" && (
              <ErrorState
                message={error}
                onRetry={() => setRetryCount((current) => current + 1)}
              />
            )}

            {status === "success" && (
              <BookList
                books={books}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </div>
        </section>

        <aside>
          <FavoritesSection
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </aside>
      </div>
    </AppShell>
  );
}

export default App;
