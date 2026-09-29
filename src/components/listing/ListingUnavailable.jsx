import { Link } from "react-router-dom";
import { buttonPrimary, eyebrow } from "../../styles/ui.js";

function ListingUnavailable() {
  return (
    <section className="mx-auto max-w-xl py-20 text-center">
      <p className={eyebrow}>Listing unavailable</p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink">
        We could not find this book.
      </h1>

      <Link to="/marketplace" className={`mt-8 ${buttonPrimary}`}>
        Return to Marketplace
      </Link>
    </section>
  );
}

export default ListingUnavailable;
