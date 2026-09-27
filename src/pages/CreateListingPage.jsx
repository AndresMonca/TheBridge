import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import CreateListingForm from "../components/create-listing/CreateListingForm.jsx";
import ListingBookCard from "../components/create-listing/ListingBookCard.jsx";
import ListingSuccess from "../components/create-listing/ListingSuccess.jsx";
import { resolveListingBook } from "../services/createListingBooks.js";

function CreateListingPage() {
  const [searchParams] = useSearchParams();
  const [published, setPublished] = useState(null);
  const requestedId = searchParams.get("book");
  const { book, notice } = resolveListingBook(requestedId);

  return (
    <AppShell
      activePage="create-listing"
      title="Create Listing"
      subtitle="Choose how you want to share your book"
    >
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            Share a book
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Create Listing
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Choose how you want to share this book with other students.
          </p>
        </div>

        <Link
          to="/my-books"
          className="w-fit rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          ← My Books
        </Link>
      </section>

      {notice && (
        <aside className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
          <p className="text-sm font-extrabold text-amber-900 dark:text-amber-200">
            {notice.title}
          </p>
          <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-300">
            {notice.text}
          </p>
        </aside>
      )}

      {!book ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <p className="font-extrabold text-slate-950 dark:text-white">
            You do not have any available books to list.
          </p>
          <Link
            to="/add-book"
            className="mt-4 inline-block text-sm font-extrabold text-indigo-600 dark:text-indigo-400"
          >
            Add a book
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
          <ListingBookCard book={book} />

          {published ? (
            <ListingSuccess
              book={book}
              modality={published.modality}
              values={published.values}
            />
          ) : (
            <CreateListingForm onPublish={setPublished} />
          )}
        </div>
      )}
    </AppShell>
  );
}

export default CreateListingPage;
