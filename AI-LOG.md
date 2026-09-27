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

## HW09 - React State

### Prompt or task

Implement TheBridge's main Marketplace feature in React using multiple pieces of state, a mount-time data fetch with cleanup, a controlled search form, inline validation, and a validation rule beyond checking for an empty field.

### AI suggestions

- Keep the Marketplace book discovery flow as the main project feature instead of adding a generic demonstration form.
- Use separate state for the search input, validation message, active query, books, favorites, request status, and request error.
- Fetch the initial Open Library results when the component mounts.
- Use `AbortController` so the initial request can be cancelled if the component unmounts before the response finishes.
- Keep the search input controlled with `value` and `onChange`.
- Validate the search while the user types and require at least three characters for a meaningful query.
- Clear the search field only after a successful search.
- Continue updating favorites immutably with `filter`, spread syntax, and new arrays.

### useEffect and cleanup reflection

Yes, AI was asked to help implement the `useEffect` cleanup logic. I understand that the function returned by `useEffect` runs when the component is unmounted. In this case, it calls `controller.abort()`, cancelling the pending initial Open Library request so that an unfinished request does not continue unnecessarily after the component is gone.

The initial API request uses an empty dependency array because it must run only once when the Marketplace component mounts. The effect uses the constant default query and functions defined outside the component, so it does not depend on changing React state or props.

### Dependency array verification

I verified the dependency arrays by checking every value used inside each effect.

- The initial Open Library effect has `[]` because it intentionally runs only on mount and does not depend on changing component state or props.
- The favorites persistence effect uses `[favorites]` because it must write to `localStorage` every time the favorites array changes.
- Values that change as a result of the effects, such as `books`, `status`, and `error`, are outputs of those effects rather than dependencies that should trigger them again.

This also avoids accidental request loops.

### Changes adopted

- Kept Marketplace search as the central project feature.
- Added multiple independent pieces of React state.
- Added a mount-time Open Library request with `useEffect(..., [])`.
- Added `AbortController` cleanup for the initial request.
- Kept favorite updates immutable.
- Implemented a controlled search input using `value` and `onChange`.
- Added inline validation while the user types.
- Added a minimum three-character validation rule.
- Reset the search field after a successful submission.
- Preserved loading, success, error, retry, favorites, and localStorage behavior from HW08.

### Tests and verification

- Verified that entering fewer than three characters immediately displays an inline validation message.
- Verified that a valid search requests new Open Library results.
- Verified that the input resets after a successful search.
- Verified that ESLint passes with zero errors and zero warnings.
- Verified that the Vite production build succeeds.
- Verified that the HW09 controlled-form and validation logic appears within the portion of `src/App.jsx` inspected by the provided autograder.

### Learning

A dependency array should describe the external changing values an effect depends on, not every variable mentioned around the component. Cleanup is especially important for asynchronous effects because a component may disappear before a network request finishes.

## HW10 - React Router and Application Architecture

### Prompt or task

Migrate the complete TheBridge Milestone 1 frontend into a React application with React Router v6, page-level routing, a dynamic listing route, protected routes, a 404 page, reusable components, separated mock data, and an architecture suitable for deployment on GitHub Pages.

### AI suggestions

- Use `BrowserRouter`, `Routes`, and `Route` as the top-level routing structure.
- Keep page-level components inside `src/pages/`.
- Keep reusable interface pieces inside `src/components/`.
- Move mock data into `src/data/` and application logic into services and hooks instead of placing it inside page components.
- Use `/listing/:id` with `useParams()` for dynamic listing details.
- Protect personal routes with a local authentication flag and redirect unauthenticated users to `/login`.
- Use `useLocation()` in shared navigation so the current route is visually identified.
- Preserve the existing Milestone 1 flows while replacing legacy HTML navigation with React Router `Link` and `useNavigate`.
- Refactor components that had grown too large by extracting meaningful responsibilities rather than splitting files only to satisfy a line count.
- Add a GitHub Pages SPA fallback so direct BrowserRouter URLs can still load the React application.

### Folder structure reflection

Yes, AI was asked to help organize the React folder structure.

The suggested architecture was not followed as a completely new structure. It was modified to preserve the shared Milestone 1 shell and the React work already completed in HW08 and HW09.

The resulting structure separates responsibilities into:

- `src/pages/` for routed screens.
- `src/components/` for reusable UI.
- `src/data/` for local mock and configuration data.
- `src/services/` for storage, validation, API, and domain logic.
- `src/hooks/` for reusable React state and behavior.

This adaptation avoided rebuilding parts of the project that were already working while still improving separation of concerns.

### Hardest architecture decision

The hardest decision was migrating every Milestone 1 screen to React Router without breaking the existing flows or allowing the legacy root HTML files to interfere with Vite routing.

The original static HTML files used paths such as `marketplace.html`, `my-books.html`, and `create-listing.html`. When React routes such as `/my-books` and `/create-listing` were introduced, those legacy files could conflict with the development server and cause the browser to load the old page instead of the React route.

The solution was to archive the legacy HTML screens, move internal navigation to React Router, and keep the existing data and interaction behavior in React components, services, hooks, and data modules.

### Changes adopted

- Added React Router v6 with `BrowserRouter`, `Routes`, and `Route`.
- Added routes for Home, Marketplace, My Books, Add Book, Create Listing, Requests, About, Login, and the 404 screen.
- Added the dynamic `/listing/:id` route using `useParams()`.
- Added protected routes for personal user flows using a local authentication flag and `Navigate`.
- Added a dedicated Login page for the protected-route demonstration.
- Added a wildcard 404 route.
- Migrated Requests and About from the Milestone 1 static implementation into React.
- Preserved the Requests Received/Sent tabs and Accept/Reject interaction using React state.
- Migrated Add Book, My Books, Create Listing, and Listing Details into routed React screens.
- Moved reusable mock data into `src/data/`.
- Moved storage, validation, status, and external API behavior into `src/services/`.
- Added custom hooks for Marketplace and Add Book search behavior.
- Refactored large Marketplace, My Books, Listing Details, Add Book, and Create Listing components by responsibility.
- Replaced internal `.html` links and `window.location` navigation with React Router `Link` and `useNavigate`.
- Added route-aware shared navigation using `useLocation()`.
- Added a GitHub Pages SPA fallback that creates `dist/404.html` after each production build.

### Tests and verification

- Ran ESLint repeatedly during the migration with zero errors and zero warnings.
- Ran the Vite production build successfully.
- Verified the GitHub Pages postbuild step creates both `dist/index.html` and `dist/404.html`.
- Verified protected navigation redirects an unauthenticated user to `/login`.
- Verified local prototype login redirects into the protected My Books route.
- Verified Add Book can add a selected book to the local library.
- Verified My Books displays locally added books.
- Verified Create Listing reads the selected book from the query string and validates modality-specific fields.
- Verified the Requests tabs render received and sent requests.
- Verified Accept and Reject update pending received requests without reloading the page.
- Verified the React source no longer contains links to the legacy `.html` pages.
- Verified the deployed GitHub Pages application loads the root route, protected Requests route, and a direct dynamic `/listing/:id` route.
- Verified the simulated Listing Details request flow for Sale and Exchange.
- Verified the completed About page includes the six-step flow, six user stories, and team information.
- Verified production assets are copied into `dist/assets` during the Vite build.
- Verified responsive layouts at 375px, 768px, 1280px, and 1440px without horizontal overflow or broken navigation.

### Learning

Routing changes affect more than URLs. Migrating a static multi-page frontend to React required coordinating route ownership, shared navigation, data placement, authentication simulation, browser history, and deployment behavior.

The most useful component refactors were the ones based on responsibility. Moving API behavior into services and hooks and moving repeated interface sections into reusable components made the routed pages easier to understand without fragmenting the project unnecessarily.
