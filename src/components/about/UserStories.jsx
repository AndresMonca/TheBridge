function UserStories({ stories }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
        User stories
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
        What the prototype should let students do
      </h2>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {stories.map((story) => (
          <article
            key={story.id}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <p className="text-xs font-black text-indigo-600 dark:text-indigo-400">
              {story.id}
            </p>

            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
              {story.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UserStories;
