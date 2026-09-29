import { Link } from "react-router-dom";
import { buttonPrimary, eyebrow, pageLead, pageTitle } from "../../styles/ui.js";

function MyBooksHeader() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className={eyebrow}>Personal library</p>
        <h1 className={`mt-3 ${pageTitle}`}>My Books</h1>
        <p className={`mt-2 max-w-xl ${pageLead}`}>
          Track available, published, and loaned books from one place.
        </p>
      </div>

      <Link to="/add-book" className={`w-full sm:w-auto ${buttonPrimary}`}>
        <span aria-hidden="true" className="text-lg leading-none">+</span>
        Add book
      </Link>
    </div>
  );
}

export default MyBooksHeader;
