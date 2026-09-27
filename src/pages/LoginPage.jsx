import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("thebridge:authenticated", "true");
    navigate("/my-books", { replace: true });
  };

  return (
    <AppShell
      activePage=""
      title="Sign in"
      subtitle="Access your personal TheBridge space"
    >
      <section className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">
          Welcome to TheBridge
        </h1>

        <p className="mt-3 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
          This academic prototype uses a local authentication flag to
          demonstrate protected routes.
        </p>

        <button
          type="button"
          onClick={handleLogin}
          className="mt-7 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          Continue as student
        </button>
      </section>
    </AppShell>
  );
}

export default LoginPage;
