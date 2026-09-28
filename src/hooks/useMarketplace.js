import { useEffect, useRef, useState } from "react";
import {
  DISCOVERY_QUERIES,
  pickRandom,
  shuffleArray,
} from "../services/discovery.js";
import { readStoredFavorites } from "../services/favorites.js";
import { searchOpenLibraryWithCache } from "../services/openLibrary.js";

const FAVORITES_KEY = "thebridge:favorites";

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
  const [discoveryQuery] = useState(() => pickRandom(DISCOVERY_QUERIES));
  const [activeQuery, setActiveQuery] = useState(discoveryQuery);
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(() =>
    readStoredFavorites(FAVORITES_KEY),
  );
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState(null);
  const requestControllerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    requestControllerRef.current = controller;

    const loadInitialBooks = async () => {
      try {
        const result = await searchOpenLibraryWithCache(
          discoveryQuery,
          controller.signal,
        );
        setBooks(shuffleArray(result.books));
        setSavedAt(result.savedAt);
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
  }, [discoveryQuery]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const runSearch = async (query) => {
    requestControllerRef.current?.abort();
    const controller = new AbortController();
    requestControllerRef.current = controller;

    setActiveQuery(query);
    setStatus("loading");
    setError("");

    try {
      const result = await searchOpenLibraryWithCache(query, controller.signal);
      setBooks(result.books);
      setSavedAt(result.savedAt);
      setStatus("success");
      return true;
    } catch (requestError) {
      if (requestError.name === "AbortError") {
        return false;
      }

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
    savedAt,
    searchError,
    searchInput,
    status,
    toggleFavorite,
  };
}
