import { listings } from "./listings.js";

export const extraCatalogBooks = [
  {
    id: "extra-01",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    cover: "https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg?default=false",
    genre: "Science Fiction",
    year: 2008,
    isbn: "9780439023481",
  },
  {
    id: "extra-02",
    title: "Gone Girl",
    author: "Gillian Flynn",
    cover: "https://covers.openlibrary.org/b/isbn/9780307588364-L.jpg?default=false",
    genre: "Thriller",
    year: 2012,
    isbn: "9780307588364",
  },
  {
    id: "extra-03",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    cover: "https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg?default=false",
    genre: "Fantasy",
    year: 1954,
    isbn: "9780544003415",
  },
  {
    id: "extra-04",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    cover: "https://covers.openlibrary.org/b/isbn/9780060934347-L.jpg?default=false",
    genre: "Classic",
    year: 1605,
    isbn: "9780060934347",
  },
  {
    id: "extra-05",
    title: "The Song of Ice and Fire",
    author: "George R.R. Martin",
    cover: "https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg?default=false",
    genre: "Fantasy",
    year: 1996,
    isbn: "9780553103540",
  },
];

export const addBookCatalog = [...listings, ...extraCatalogBooks];

export const bookConditions = [
  "Like new",
  "Good condition",
  "Used copy",
];
