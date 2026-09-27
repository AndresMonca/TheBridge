import { baseMyBooks } from "../data/myBooks.js";

const STORAGE_KEY = "thebridge:my-books";

export function loadMyBooks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    return Array.isArray(stored)
      ? [...baseMyBooks, ...stored]
      : [...baseMyBooks];
  } catch {
    return [...baseMyBooks];
  }
}

export function saveMyBook(book) {
  let existing;

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing = Array.isArray(stored) ? stored : [];
  } catch {
    existing = [];
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...existing, book]),
  );

  window.dispatchEvent(
    new CustomEvent("thebridge:book-added", { detail: book }),
  );
}

export function createLibraryBook(book, condition, notes) {
  return {
    id: `added-${Date.now()}`,
    title: book.title,
    author: book.author,
    cover: book.cover || "",
    genre: book.genre || "Default",
    condition,
    status: "Available",
    notes: notes.trim(),
    addedAt: new Date().toISOString().split("T")[0],
  };
}
