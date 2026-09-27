import { useEffect, useState } from "react";
import { readStoredFavorites } from "../services/favorites.js";
import { searchOpenLibrary } from "../services/openLibrary.js";

const FAVORITES_KEY = "thebridge:favorites";
export const DEFAULT_MARKETPLACE_QUERY = "computer science";

function validateSearch(value) {
  const query = value.trim();

  if (!query) {
    return "Enter a title, author, or keyword.";
  }

  return query.length < 3 ? "Use at least 3 characters." : "";
}

export function useMarketplace() {
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [activeQuery, setActiveQuery] = useState(DEFAULT_MARKETPLACE_QUERY);
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(() =>
    readStoredFavorites(FAVORITES_KEY),
  );
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    searchOpenLibrary(DEFAULT_MARKETPLACE_QUERY, controller.signal)
      .then((results) => {
        setBooks(results);
        setStatus("success");
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Open Library is unavailable.");
          setStatus("error");
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const runSearch = async (query) => {
    setActiveQuery(query);
    setStatus("loading");
    setError("");

    try {
      setBooks(await searchOpenLibrary(query));
      setStatus("success");
      return true;
    } catch (requestError) {
      setError(requestError.message || "Open Library is unavailable.");
      setStatus("error");
      return false;
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setSearchError(value ? validateSearch(value) : "");
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const message = validateSearch(searchInput);
    setSearchError(message);

    if (message) {
      return;
    }

    if (await runSearch(searchInput.trim())) {
      setSearchInput("");
      setSearchError("");
    }
  };

  const toggleFavorite = (book) => {
    setFavorites((current) =>
      current.some((favorite) => favorite.id === book.id)
        ? current.filter((favorite) => favorite.id !== book.id)
        : [...current, book],
    );
  };

  return {
    activeQuery,
    books,
    error,
    favorites,
    handleSearchChange,
    handleSearchSubmit,
    runSearch,
    searchError,
    searchInput,
    status,
    toggleFavorite,
  };
}
