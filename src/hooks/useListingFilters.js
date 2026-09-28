import { useEffect, useMemo, useState } from "react";
import {
  computeListingStats,
  filterListings,
  initialListingFilters,
} from "../services/listingFilters.js";
import {
  LISTINGS_EVENT,
  loadAllListings,
} from "../services/listingsStorage.js";

export function useListingFilters() {
  const [filters, setFilters] = useState(initialListingFilters);
  const [allListings, setAllListings] = useState(loadAllListings);

  useEffect(() => {
    const refreshListings = () => setAllListings(loadAllListings());

    window.addEventListener(LISTINGS_EVENT, refreshListings);
    window.addEventListener("storage", refreshListings);

    return () => {
      window.removeEventListener(LISTINGS_EVENT, refreshListings);
      window.removeEventListener("storage", refreshListings);
    };
  }, []);

  const filteredListings = useMemo(
    () => filterListings(allListings, filters),
    [allListings, filters],
  );

  const stats = useMemo(
    () => computeListingStats(filteredListings),
    [filteredListings],
  );

  const hasActiveFilters = Object.keys(initialListingFilters).some(
    (key) => filters[key] !== initialListingFilters[key],
  );

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const resetFilters = () => {
    setFilters(initialListingFilters);
  };

  return {
    allListings,
    filters,
    filteredListings,
    stats,
    hasActiveFilters,
    updateFilter,
    resetFilters,
  };
}
