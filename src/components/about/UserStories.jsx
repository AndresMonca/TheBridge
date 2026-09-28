import { eyebrow } from "../../styles/ui.js";

function UserStories({ stories }) {
  return (
    <section className="pt-10">
      <p className={eyebrow}>User stories</p>

      <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">
        What the prototype should let people do
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-8 lg:grid-cols-2">
        {stories.map((story) => (
          <article
            key={story.id}
            className="flex gap-4 border-t border-line py-4"
          >
            <p className="w-12 shrink-0 pt-0.5 text-xs font-semibold text-wine-ink">
              {story.id}
            </p>

            <p className="text-sm leading-6 text-ink">{story.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UserStories;
