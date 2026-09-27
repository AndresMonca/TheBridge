import { useState } from "react";
import BookConditionOptions from "./BookConditionOptions.jsx";
import BookCopyNotes from "./BookCopyNotes.jsx";
import {
  createLibraryBook,
  saveMyBook,
} from "../../services/myBooksStorage.js";

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
    <section className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 text-sm font-extrabold text-indigo-600 dark:text-indigo-400"
      >
        ← Back to search
      </button>

      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[150px_1fr]">
        <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
          {book.cover ? (
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="aspect-[2/3] h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center p-4 text-center text-sm font-bold text-slate-400">
              Cover unavailable
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            Confirm your copy
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            {book.title}
          </h2>

          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {book.author}
          </p>

          <div className="mt-6">
            <BookConditionOptions
              value={condition}
              onChange={handleConditionChange}
              hasError={hasError}
            />
          </div>

          <BookCopyNotes value={notes} onChange={setNotes} />

          <button
            type="submit"
            className="mt-5 w-full rounded-2xl bg-slate-950 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
          >
            Add to My Library
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddBookConfirm;
