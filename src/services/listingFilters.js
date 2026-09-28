import { normalizeCatalogValue } from "./catalogSearch.js";
import { formatListingPrice } from "./listingValidation.js";

export const ALL_OPTION = "All";

export const initialListingFilters = {
  search: "",
  modality: ALL_OPTION,
  genre: ALL_OPTION,
  condition: ALL_OPTION,
};

export function filterListings(items, { search, modality, genre, condition }) {
  const term = normalizeCatalogValue(search).trim();

  return items.filter((listing) => {
    const searchable = normalizeCatalogValue(
      `${listing.title} ${listing.author} ${listing.genre} ${listing.isbn}`,
    );

    return (
      (!term || searchable.includes(term)) &&
      (modality === ALL_OPTION || listing.modality === modality) &&
      (genre === ALL_OPTION || listing.genre === genre) &&
      (condition === ALL_OPTION || listing.condition === condition)
    );
  });
}

export function getUniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getNewestListings(items, count) {
  return [...items]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, count);
}

export function computeListingStats(items) {
  return items.reduce(
    (stats, listing) => {
      const current = stats.byModality[listing.modality] ?? {
        count: 0,
        priceTotal: 0,
        pricedCount: 0,
      };
      const hasPrice = typeof listing.price === "number";

      return {
        total: stats.total + 1,
        byModality: {
          ...stats.byModality,
          [listing.modality]: {
            count: current.count + 1,
            priceTotal: current.priceTotal + (hasPrice ? listing.price : 0),
            pricedCount: current.pricedCount + (hasPrice ? 1 : 0),
          },
        },
      };
    },
    { total: 0, byModality: {} },
  );
}

export function getAveragePrice(modalityStats) {
  if (!modalityStats?.pricedCount) {
    return null;
  }

  return Math.round(modalityStats.priceTotal / modalityStats.pricedCount);
}

export function getListingOfferLabel(listing) {
  if (listing.modality === "Sale") {
    return formatListingPrice(listing.price);
  }

  if (listing.modality === "Rental") {
    return `${formatListingPrice(listing.price)} / ${listing.duration}`;
  }

  if (listing.modality === "Loan") {
    return `Free loan · ${listing.duration}`;
  }

  return listing.desiredBook ? `For ${listing.desiredBook}` : "Open to offers";
}
