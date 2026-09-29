import { useState } from "react";
import AddBookConfirmHeading from "./AddBookConfirmHeading.jsx";
import AddBookCover from "./AddBookCover.jsx";
import BookConditionOptions from "./BookConditionOptions.jsx";
import BookCopyNotes from "./BookCopyNotes.jsx";
import {
  createLibraryBook,
  saveMyBook,
} from "../../services/myBooksStorage.js";
import { buttonGhost, buttonPrimary } from "../../styles/ui.js";

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

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-10">
        <AddBookCover book={book} />

        <form onSubmit={handleSubmit}>
          <AddBookConfirmHeading book={book} />

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
