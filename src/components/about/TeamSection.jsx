import { card, eyebrow } from "../../styles/ui.js";

function initialsOf(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TeamSection({ members }) {
  return (
    <section className="pt-10">
      <p className={eyebrow}>Team</p>

      <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">
        TheBridge contributors
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {members.map((member) => (
          <article key={member.name} className={`flex items-center gap-4 p-4 ${card}`}>
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wine-soft text-sm font-semibold text-wine-ink"
              aria-hidden="true"
            >
              {initialsOf(member.name)}
            </span>

            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-ink">
                {member.name}
              </h3>

              <p className="mt-0.5 text-sm leading-6 text-ink-muted">
                {member.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
