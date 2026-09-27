import { Link } from "react-router-dom";

function AddBookSuccess({ book, onAddAnother }) {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900/60 dark:bg-emerald-950/20">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl font-black text-white">
        ✓
      </div>

      <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
        Book added
      </p>

      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
        Added to your library
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">
        "{book.title}" by {book.author} is now in your library as Available.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/my-books"
          className="rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 dark:bg-emerald-600"
        >
          Go to My Books
        </Link>

        <button
          type="button"
          onClick={onAddAnother}
          className="rounded-2xl border border-emerald-300 bg-white px-6 py-3 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 dark:border-emerald-800/60 dark:bg-emerald-950/30 dark:text-emerald-200"
        >
          Add another book
        </button>
      </div>
    </section>
  );
}

export default AddBookSuccess;
