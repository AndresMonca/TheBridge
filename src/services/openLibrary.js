export function normalizeOpenLibraryBooks(docs = []) {
  return docs.slice(0, 20).map((book) => ({
    id: book.key || `${book.title}-${book.first_publish_year || "unknown"}`,
    title: book.title || "Untitled",
    author: book.author_name?.[0] || "Unknown author",
    year: book.first_publish_year || null,
    editionCount: book.edition_count || 1,
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : null,
  }));
}
