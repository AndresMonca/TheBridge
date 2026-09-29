import { coverFrame } from "../../styles/ui.js";

function AddBookCover({ book }) {
  return (
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
  );
}

export default AddBookCover;
