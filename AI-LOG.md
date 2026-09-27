# AI-LOG

## Repository Foundation

### Prompt or task

Prepare the initial repository foundation for TheBridge Milestone 1 without implementing the application screens.

### AI suggestions

- Create the required project documentation files.
- Define the seven planned HTML entry points.
- Record the frontend-only scope and the six Milestone 1 user stories.
- Add a simple GitHub Flow collaboration rule.

### Changes adopted

- Added an English README with the academic project context.
- Added `DECISIONS.md`, `figma-link.txt`, and this AI log.
- Added placeholder HTML entry points and empty asset directories.
- Added a static-project `.gitignore`.

### Human changes and review

The project owner reviewed the scope and required that visible project content and documentation remain in English. Code comments will be written in Spanish when they explain non-obvious implementation intent.

### Tests and verification

- Pending manual browser verification of every placeholder page.
- Pending review of the first commit before feature work begins.

### Learning

The repository foundation must preserve the agreed frontend-only scope so future implementation tasks remain small and reviewable.

## Requests, About, and Team Documentation (Integrante 4)

### Prompt or task

Implement `requests.html` and `about.html` and update `CONTRIBUTING.md`, `README.md`, and this log, following the Integrante 4 scope in the team master guide (Requests + About + documentation) on top of the merged v5 base.

### AI suggestions

- Reuse the shared shell (sidebar, header, bottom navigation) copied verbatim from `marketplace.html`, changing only the active navigation state and the `<main>` content.
- Implement the Requests tabs with the WAI-ARIA tabs pattern (roving `tabindex`, arrow key navigation) instead of a custom non-accessible toggle.
- Represent Pending/Accepted/Rejected with an icon plus text label, not color alone, and add an `aria-live` region that explains the practical meaning of each new state.
- Reference `js/data.js` listings by id from the mock request data instead of duplicating book information.
- Draft `about.html` content directly from the existing README sections (problem, target users, why a web app, solution, main flow, six user stories) to keep the two documents consistent.
- Add a visible note on the Requests screen stating the interaction is simulated, per the project's honesty rule.

### Changes adopted

- Added `requests.html` and `js/requests.js` with the tabs, states, actions, and accessibility behavior described above.
- Added `about.html` with the problem, target users, rationale, solution, main flow, six user stories, and a team section with the four real team members' names and general roles.
- Added `CONTRIBUTING.md` documenting GitHub Flow, branch and commit rules, the pull request checklist, and the language rules for the team.
- Updated `README.md`: replaced the placeholder team section with real names and general roles, and updated the Static Prototype section to reflect which screens are implemented versus in progress.

### Human changes and review

The project owner confirmed the real names of all four team members and asked that no specific person be assigned to the My Books/Add Book vs. Create Listing/Listing Details split in written documentation, so both are described with a shared, general role label. The owner also directed that Milestone 1's real base (merged by Integrante 1) be pulled and verified before starting this work, since the repository initially only contained a placeholder skeleton.

### Tests and verification

- Manually reviewed `requests.html` markup for balanced tags and correct `aria-*` attributes against the shared shell copied from `marketplace.html` and `index.html`.
- Verified the Requests mock data ids match real entries in `js/data.js` so covers, titles, and modalities render correctly.
- Pending: keyboard-only walkthrough of the tabs and Accept/Reject buttons, and responsive/dark-mode checks at 375px, 768px, 1280px, and 1440px, before opening the pull request.

### Learning

Confirming the real state of `main` before branching (rather than assuming Milestone 1 was already merged) avoided building the Requests and About screens on top of a placeholder that would have needed to be redone. Keeping user-facing copy directly derived from the README also reduced the risk of the two documents drifting apart.
