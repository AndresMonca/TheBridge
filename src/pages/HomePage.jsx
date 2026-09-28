import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import CommunitySummary from "../components/home/CommunitySummary.jsx";
import FeaturedListings from "../components/home/FeaturedListings.jsx";
import HeroVisual from "../components/home/HeroVisual.jsx";
import {
  buttonPrimary,
  buttonSecondary,
  eyebrow,
  pageLead,
} from "../styles/ui.js";

function HomePage() {
  return (
    <AppShell
      activePage="home"
      title="Home"
      subtitle="Find your next book connection"
    >
      <section className="grid items-center gap-10 pt-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pt-8">
        <div>
          <p className={eyebrow}>Community book marketplace</p>

          <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Find the book that connects you to what comes next.
          </h1>

          <p className={`mt-5 max-w-lg sm:text-lg sm:leading-8 ${pageLead}`}>
            Discover books shared by people in your community through
            exchange, loan, rental, and sale.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/marketplace" className={buttonPrimary}>
              Explore Marketplace
            </Link>

            <Link to="/add-book" className={buttonSecondary}>
              Add your book
            </Link>
          </div>
        </div>

        <HeroVisual />
      </section>

      <CommunitySummary />
      <FeaturedListings />
    </AppShell>
  );
}

export default HomePage;
