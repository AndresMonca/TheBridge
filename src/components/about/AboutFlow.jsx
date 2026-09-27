function AboutFlow({ steps }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
        Main flow
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
        From discovery to connection
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-lg dark:bg-indigo-950/40"
                aria-hidden="true"
              >
                {step.icon}
              </span>

              <div>
                <p className="text-xs font-extrabold text-slate-400">
                  Step {index + 1}
                </p>

                <p className="text-sm font-extrabold text-slate-950 dark:text-white">
                  {step.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutFlow;
