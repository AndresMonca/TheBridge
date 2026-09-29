import { eyebrow, pageLead, pageTitle } from "../../styles/ui.js";

function MarketplaceIntro() {
  return (
    <header className="max-w-2xl">
      <p className={eyebrow}>Community books</p>
      <h1 className={`mt-3 ${pageTitle}`}>
        Find your next book through your community.
      </h1>
      <p className={`mt-3 ${pageLead}`}>
        Physical copies shared on TheBridge by people in your community — to exchange, borrow, rent, or buy.
      </p>
    </header>
  );
}

export default MarketplaceIntro;
