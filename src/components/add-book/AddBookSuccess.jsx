import { Link } from "react-router-dom";
import {
  buttonPrimary,
  buttonSecondary,
  eyebrow,
  pageLead,
  tone,
} from "../../styles/ui.js";

function AddBookSuccess({ book, onAddAnother }) {
  return (
    <section className="mx-auto max-w-xl py-12 text-center">
      <div
        className={`mx-auto grid h-14 w-14 place-items-center rounded-full text-2xl font-bold ${tone.sage}`}
        aria-hidden="true"
      >
        ✓
      </div>

      <p className={`mt-6 ${eyebrow}`}>Book added</p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Added to your library
      </h2>

      <p className={`mx-auto mt-3 max-w-lg ${pageLead}`}>
        "{book.title}" by {book.author} is now in your library as Available.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link to="/my-books" className={`w-full sm:w-auto ${buttonPrimary}`}>
          Go to My Books
        </Link>

        <button
          type="button"
          onClick={onAddAnother}
          className={`w-full sm:w-auto ${buttonSecondary}`}
        >
          Add another book
        </button>
      </div>
    </section>
  );
}

export default AddBookSuccess;
