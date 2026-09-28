import { eyebrow } from "../../styles/ui.js";

function AboutFlow({ steps }) {
  return (
    <section className="pt-10">
      <p className={eyebrow}>Main flow</p>

      <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">
        From discovery to connection
      </h2>

      <ol className="mt-6 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="flex items-center gap-4 border-t border-line py-4"
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-wine-soft text-lg"
              aria-hidden="true"
            >
              {step.icon}
            </span>

            <div>
              <p className="text-xs font-medium text-ink-muted">
                Step {index + 1}
              </p>

              <p className="text-[15px] font-semibold text-ink">{step.label}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default AboutFlow;
