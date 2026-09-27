import AppShell from "../components/AppShell.jsx";
import AboutFlow from "../components/about/AboutFlow.jsx";
import TeamSection from "../components/about/TeamSection.jsx";
import UserStories from "../components/about/UserStories.jsx";
import {
  aboutFlow,
  aboutSections,
  teamMembers,
  userStories,
} from "../data/aboutContent.js";

function AboutSection({ section }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
        {section.eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
        {section.title}
      </h2>

      {section.body && (
        <p className="mt-4 text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
          {section.body}
        </p>
      )}

      {section.items && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {section.items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70"
            >
              <p className="text-sm font-extrabold text-slate-950 dark:text-white">
                {item.label}
              </p>

              <p className="mt-1 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function AboutPage() {
  return (
    <AppShell
      activePage="about"
      title="About TheBridge"
      subtitle="Why this prototype exists and how students use it"
    >
      <div className="space-y-6">
        <section className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-7 text-white shadow-xl shadow-indigo-500/15 sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-100">
            TheBridge
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            A simpler way for students to share physical books.
          </h1>

          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-indigo-100 sm:text-base">
            TheBridge is a frontend prototype designed around discovering,
            sharing, and requesting books inside a university community.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          {aboutSections.map((section) => (
            <AboutSection key={section.eyebrow} section={section} />
          ))}
        </div>

        <AboutFlow steps={aboutFlow} />
        <UserStories stories={userStories} />
        <TeamSection members={teamMembers} />
      </div>
    </AppShell>
  );
}

export default AboutPage;
