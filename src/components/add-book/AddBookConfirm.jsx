import { useState } from "react";
import BookConditionOptions from "./BookConditionOptions.jsx";
import BookCopyNotes from "./BookCopyNotes.jsx";
import BookMetadata from "../catalog/BookMetadata.jsx";
import {
  createLibraryBook,
  saveMyBook,
} from "../../services/myBooksStorage.js";
import {
  buttonGhost,
  buttonPrimary,
  coverFrame,
  eyebrow,
} from "../../styles/ui.js";

function AddBookConfirm({ book, onBack, onSaved }) {
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleConditionChange = (value) => {
    setCondition(value);
    setHasError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!condition) {
      setHasError(true);
      return;
    }

    const newBook = createLibraryBook(book, condition, notes);
    saveMyBook(newBook);
    onSaved(newBook);
  };

  return (
    <section className="max-w-3xl">
      <button type="button" onClick={onBack} className={`-ml-3 mb-6 ${buttonGhost}`}>
        ← Back to search
      </button>

      <div className="grid gap-8 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-10">
        <div className={`w-32 shadow-card sm:w-full ${coverFrame}`}>
          {book.cover ? (
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="aspect-[2/3] h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center p-4 text-center text-sm font-medium text-ink-muted">
              Cover unavailable
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <p className={eyebrow}>Confirm your copy</p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {book.title}
          </h2>

          <p className="mt-1 text-[15px] text-ink-muted">{book.author}</p>

          <BookMetadata
            book={book}
            fields={["year", "publisher", "language", "isbn"]}
            className="mt-5 max-w-md border-y border-line"
          />

          <div className="mt-8">
            <BookConditionOptions
              value={condition}
              onChange={handleConditionChange}
              hasError={hasError}
            />
          </div>

          <BookCopyNotes value={notes} onChange={setNotes} />

          <button type="submit" className={`mt-6 w-full sm:w-auto sm:px-8 ${buttonPrimary}`}>
            Add to My Library
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddBookConfirm;
