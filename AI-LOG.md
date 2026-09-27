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

## HW08 - React Introduction

### Prompt or task

Migrate the HW07 public API experience to React, preserve the loading, success, and error states, split the interface into reusable components, and add persistent favorites using React state and localStorage.

### AI suggestions

- Keep application state and the Open Library request in `App.jsx` so the data flow remains easy to follow during the React introduction.
- Split the interface by responsibility instead of by visual fragments:
  - `SearchBar.jsx` handles the controlled search form.
  - `BookList.jsx` renders the result collection.
  - `BookCard.jsx` represents one book and its favorite action.
  - `LoadingState.jsx` represents the loading state.
  - `ErrorState.jsx` represents failed requests and retry behavior.
  - `FavoritesSection.jsx` displays and removes saved books.
- Normalize the Open Library response in `src/services/openLibrary.js` so presentation components do not depend on the full external API response.
- Persist favorites in `localStorage` and restore them when React initializes.
- Use an `AbortController` in the fetch effect so an unfinished request can be cancelled when the effect is cleaned up.

### Component split reflection

Yes, AI was asked to help split the application into components. The split was based on each part having one clear responsibility and on whether that part could be reused or tested independently. Search, result rendering, individual book cards, UI states, and favorites therefore became separate named components instead of keeping the full interface inside `App.jsx`.

I agree with this split because it keeps the UI components small while `App.jsx` currently makes the main React state and API flow easy to inspect. For Milestone 2, once routing is introduced, I would move Marketplace-specific state and behavior into a `MarketplacePage` component or a dedicated hook so `App.jsx` can focus mainly on application routing and top-level architecture.

### Changes adopted

- Rebuilt the Open Library search experience in React.
- Added explicit loading, success, and error rendering.
- Added reusable SearchBar, BookList, BookCard, LoadingState, ErrorState, and FavoritesSection components.
- Rendered collections with `.map()` and stable `key` values.
- Added favorite and unfavorite actions using `useState`.
- Added persistent favorites through `localStorage`.
- Added retry behavior after a failed API request.
- Kept the existing online/offline indicator and made it visible on mobile layouts.

### Tests and verification

- Ran the full ESLint command with zero errors and zero warnings.
- Ran the Vite production build successfully.
- Verified Open Library search with multiple queries.
- Verified loading, success, and forced offline error states.
- Verified retry after restoring the network connection.
- Verified adding and removing favorites from both results and the Favorites section.
- Verified favorites persist after a page reload.
- Verified the online/offline indicator on desktop, tablet, and mobile layouts.

### Learning

Component boundaries are clearer when they follow responsibilities rather than arbitrary visual sections. Keeping external API normalization separate also makes the React components simpler and reduces coupling to Open Library's response format.
