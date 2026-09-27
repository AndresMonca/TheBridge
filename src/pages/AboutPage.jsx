import AppShell from "../components/AppShell.jsx";
import { aboutFlow, aboutSections } from "../data/aboutContent.js";

function AboutSection({ section }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
        {section.eyebrow}
      </p>

      <h2 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
        {section.title}
      </h2>

      {section.body && (
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {section.body}
        </p>
      )}

      {section.items && (
        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {section.items.map((item) => (
            <li key={item.label}>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {item.label}:
              </span>{" "}
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function AboutPage() {
  return (
    <AppShell
      activePage="about"
      title="About"
      subtitle="Why we are building TheBridge"
    >
      <section>
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          About TheBridge
        </p>

        <h1 className="mt-1 text-3xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-4xl">
          Why we are building TheBridge
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          A Milestone 1 frontend prototype for DSAW at Universidad de La Sabana.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {aboutSections.map((section) => (
            <AboutSection
              key={section.eyebrow}
              section={section}
            />
          ))}
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
            Main flow
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            Find a book, share a book, connect
          </h2>

          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutFlow.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400">
                  Step {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </section>
    </AppShell>
  );
}

export default AboutPage;
