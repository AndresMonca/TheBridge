import BookMetadata from "../catalog/BookMetadata.jsx";
import { eyebrow } from "../../styles/ui.js";

function AddBookConfirmHeading({ book }) {
  return (
    <>
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
    </>
  );
}

export default AddBookConfirmHeading;
