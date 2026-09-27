import { addBookCatalog } from "../data/addBookData.js";

function normalizeCatalogValue(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function searchAddBookCatalog(query) {
  const term = normalizeCatalogValue(query);

  if (!term) {
    return [];
  }

  return addBookCatalog.filter((book) => {
    const searchable = normalizeCatalogValue(
      `${book.title} ${book.author} ${book.isbn || ""}`,
    );

    return searchable.includes(term);
  });
}

export function isSimulatedSearchError(query) {
  return normalizeCatalogValue(query) === "error";
}
