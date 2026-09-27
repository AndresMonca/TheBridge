import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

function NotFoundPage() {
  return (
    <AppShell
      activePage=""
      title="Page not found"
      subtitle="The requested page does not exist"
    >
      <section className="mx-auto max-w-xl py-16 text-center">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
          This bridge leads nowhere.
        </h1>

        <p className="mt-4 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
          The page may have moved or the address may be incorrect.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
        >
          Return home
        </Link>
      </section>
    </AppShell>
  );
}

export default NotFoundPage;
