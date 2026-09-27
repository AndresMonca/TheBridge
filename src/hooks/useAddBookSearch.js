import { useEffect, useState } from "react";
import {
  isSimulatedSearchError,
  searchAddBookCatalog,
} from "../services/catalogSearch.js";

export function useAddBookSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState([]);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (status !== "loading" || !submittedQuery) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (isSimulatedSearchError(submittedQuery)) {
        setStatus("error");
        return;
      }

      const matches = searchAddBookCatalog(submittedQuery);
      setResults(matches);
      setStatus(matches.length > 0 ? "results" : "no-results");
    }, 850);

    return () => window.clearTimeout(timer);
  }, [status, submittedQuery]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setValidationError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setValidationError("Enter at least 2 characters to search.");
      return;
    }

    setSubmittedQuery(trimmedQuery);
    setStatus("loading");
  };

  const resetSearch = () => {
    setQuery("");
    setSubmittedQuery("");
    setResults([]);
    setValidationError("");
    setStatus("idle");
  };

  const retrySearch = () => {
    setStatus("idle");
  };

  return {
    query,
    submittedQuery,
    status,
    results,
    validationError,
    handleQueryChange,
    handleSubmit,
    resetSearch,
    retrySearch,
  };
}
