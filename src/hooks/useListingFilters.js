import { useMemo, useState } from "react";
import { listings } from "../data/listings.js";
import {
  computeListingStats,
  filterListings,
  initialListingFilters,
} from "../services/listingFilters.js";

export function useListingFilters() {
  const [filters, setFilters] = useState(initialListingFilters);

  const filteredListings = useMemo(
    () => filterListings(listings, filters),
    [filters],
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
    filters,
    filteredListings,
    stats,
    hasActiveFilters,
    updateFilter,
    resetFilters,
  };
}
