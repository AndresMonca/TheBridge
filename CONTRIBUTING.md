# Contributing to TheBridge

This project follows a simple GitHub Flow for a four-person academic team. These rules apply to every contribution in Milestone 1 and Milestone 2.

## Branching

- `main` is always deployable and only receives reviewed changes.
- Create a short-lived feature branch from an up-to-date `main` for every task:
  ```
  git switch main
  git pull origin main
  git switch -c feature/<short-description>
  ```
- One branch per scope of work (for example `feature/my-books-add-book`, `feature/listings`, `feature/requests-about-docs`). Do not mix unrelated changes in the same branch.

## Commits

- Keep commits small and coherent: one logical change per commit.
- Write commit messages in English, in the imperative mood (`feat: add request accept and reject actions`, not `added stuff`).
- Prefix commits with a short type when possible: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- Run `git status` and `git diff` before every commit to confirm only the intended files changed.

## Ownership and scope

- Each team member has an assigned set of files (see `TEAM-HANDOFF.md`). Do not edit another member's files, `index.html`, `marketplace.html`, `js/data.js`, `js/navigation.js`, or the locked brand assets without a coordinated, separate pull request.
- Reuse the shared visual system (Tailwind classes, layout shell, sidebar, header, bottom navigation) instead of introducing a second navigation, palette, or component set.
- Do not introduce a backend, database, real authentication, real payments, or real persistence in Milestone 1. Milestone 2 adds React and client-side routing only, as scoped by the team guide.

## Pull requests

Every pull request must target `main` and include:

1. What was implemented.
2. Which files were modified.
3. Which requirements are covered.
4. Manual tests performed (states checked, screen sizes, keyboard navigation).
5. What remains pending, if anything.
6. Screenshots for mobile and desktop when the change is visual.

At least one other team member must review a pull request before it is merged.

## Manual verification checklist

Before opening a pull request, verify:

- The change stays within the assigned scope.
- The screen works at 375px, 768px, 1280px, and 1440px without horizontal scroll.
- Dark mode keeps contrast, borders, icons, and overlays legible.
- All relevant states are represented (initial, loading, data, empty, error, validation, success) where they apply.
- Interactive controls have an accessible name and a visible focus state.
- Keyboard navigation works, `Escape` closes modals, and tabs/buttons are operable without a mouse.
- No JavaScript errors appear in the browser console.
- No links are broken.
- No Spanish text is visible in the application interface.
- Event handlers are attached with `addEventListener`, never inline `onclick` attributes.
- No dead code, style overrides, obvious duplication, or ambiguous variable names were introduced.

## Language rules

- All visible interface text and academic documentation (`README.md`, `AI-LOG.md`, this file) is written in English.
- Code comments are written in Spanish and explain intention, flow, validation, state changes, or non-obvious decisions — not what a line of code or an HTML tag already says on its own.

## AI usage

Significant AI assistance must be recorded in `AI-LOG.md`: the prompt or task, the suggestions received, which changes were adopted, which changes were made manually afterward, how the result was tested, and what was learned. See `AI-LOG.md` for the format and existing entries.
