import { useEffect, useState } from "react";
import { searchOpenLibraryWithCache } from "../services/openLibrary.js";

function toCatalogBook(book) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    publicationYear: book.publicationYear,
    publisher: book.publisher,
    isbn: book.isbn,
    language: book.language,
    editionCount: book.editionCount,
    coverUrl: book.coverUrl,
    cover: book.coverUrl || "",
  };
}

export function useCatalogSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState([]);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (status !== "loading" || !submittedQuery) {
      return undefined;
    }

    const controller = new AbortController();

    const loadResults = async () => {
      try {
        const { books } = await searchOpenLibraryWithCache(
          submittedQuery,
          controller.signal,
        );
        const matches = books.map(toCatalogBook);
        setResults(matches);
        setStatus(matches.length > 0 ? "results" : "no-results");
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setStatus("error");
        }
      }
    };

    loadResults();

    return () => controller.abort();
  }, [status, submittedQuery]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setValidationError("");
  };

  const submitSearch = () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setValidationError("Enter at least 2 characters to search.");
      return;
    }

    setSubmittedQuery(trimmedQuery);
    setStatus("loading");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitSearch();
  };

  const resetSearch = () => {
    setQuery("");
    setSubmittedQuery("");
    setResults([]);
    setValidationError("");
    setStatus("idle");
  };

  const retrySearch = () => {
    setStatus(submittedQuery ? "loading" : "idle");
  };

  return {
    query,
    submittedQuery,
    status,
    results,
    validationError,
    handleQueryChange,
    handleSubmit,
    submitSearch,
    resetSearch,
    retrySearch,
  };
}
