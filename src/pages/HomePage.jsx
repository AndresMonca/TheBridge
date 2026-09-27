import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

function HomePage() {
  return (
    <AppShell
      activePage="home"
      title="Home"
      subtitle="Find your next book connection"
    >
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid min-h-[460px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              Student book marketplace
            </p>

            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Find the book that connects you to what comes next.
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Discover books from students around you through exchange, loan,
              rental, and sale.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/marketplace"
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                Explore Marketplace
              </Link>

              <Link
                to="/add-book"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Add your book
              </Link>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-full">
            <img
              src={`${import.meta.env.BASE_URL}assets/hero/find-your-bridge.webp`}
              alt="Student reading near a bridge at sunset"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export default HomePage;
