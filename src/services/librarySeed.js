import { bookConditions } from "../data/addBookData.js";
import { DISCOVERY_QUERIES, pickRandom, shuffleArray } from "./discovery.js";
import { searchOpenLibraryWithCache } from "./openLibrary.js";

const SEED_KEY = "thebridge:my-books-seed";
const SEED_SIZE = 4;
export const MY_BOOKS_EVENT = "thebridge:my-books-changed";

let seedingPromise = null;

export function loadSeedBooks() {
  try {
    const stored = JSON.parse(localStorage.getItem(SEED_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function toSeedBook(book, genre, index) {
  return {
    id: `seed-${book.id.replace(/[^a-zA-Z0-9]/g, "")}`,
    title: book.title,
    author: book.author,
    cover: book.coverUrl,
    genre,
    condition: bookConditions[index % bookConditions.length],
    status: "Available",
    notes: "",
    addedAt: new Date().toISOString().split("T")[0],
    year: book.year,
    publisher: book.publisher,
    isbn: book.isbn,
    language: book.language,
    source: "openlibrary",
  };
}

async function createSeed() {
  const query = pickRandom(DISCOVERY_QUERIES);
  const { books } = await searchOpenLibraryWithCache(query);
  const genre = query.charAt(0).toUpperCase() + query.slice(1);
  const candidates = books.filter(
    (book) => book.coverUrl && book.author !== "Unknown author",
  );

  const seed = shuffleArray(candidates)
    .slice(0, SEED_SIZE)
    .map((book, index) => toSeedBook(book, genre, index));

  if (seed.length === 0) {
    return;
  }

  localStorage.setItem(SEED_KEY, JSON.stringify(seed));
  window.dispatchEvent(new CustomEvent(MY_BOOKS_EVENT));
}

function hasSeed() {
  try {
    return localStorage.getItem(SEED_KEY) !== null;
  } catch {
    return true;
  }
}

export function ensureLibrarySeed() {
  if (hasSeed() || seedingPromise) {
    return seedingPromise;
  }

  seedingPromise = createSeed()
    .catch(() => null)
    .finally(() => {
      seedingPromise = null;
    });

  return seedingPromise;
}
