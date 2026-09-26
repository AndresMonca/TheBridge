(() => {
  const listings = Array.isArray(window.TheBridgeData) ? window.TheBridgeData : [];

  const elements = {
    searchForm: document.querySelector("#search-form"),
    searchInput: document.querySelector("#marketplace-search"),
    searchError: document.querySelector("#search-error"),
    suggestions: document.querySelector("#search-suggestions"),
    suggestionsContent: document.querySelector("#search-suggestions-content"),
    suggestionsStatus: document.querySelector("#suggestions-status"),
    apiState: document.querySelector("#api-state"),
    apiStateText: document.querySelector("#api-state-text"),
    apiDiscovery: document.querySelector("#api-discovery"),
    grid: document.querySelector("#listings-grid"),
    resultsSummary: document.querySelector("#results-summary"),
    statsSummary: document.querySelector("#stats-summary"),
    emptyState: document.querySelector("#empty-state"),
    clearFilters: document.querySelector("#clear-filters"),
    clearFiltersInline: document.querySelector("#clear-filters-inline"),
    genreFilter: document.querySelector("#genre-filter"),
    authorFilter: document.querySelector("#author-filter"),
    yearFilter: document.querySelector("#year-filter"),
    conditionFilter: document.querySelector("#condition-filter"),
    sortFilter: document.querySelector("#sort-filter"),
    modalityButtons: document.querySelectorAll("[data-modality]"),
    savedButton: document.querySelector("[data-saved-filter]"),
    advancedFiltersToggle: document.querySelector("#advanced-filters-toggle"),
    advancedFilters: document.querySelector("#advanced-filters"),
    quickView: document.querySelector("#quick-view"),
    quickViewBackdrop: document.querySelector("#quick-view-backdrop"),
    quickViewContent: document.querySelector("#quick-view-content"),
    quickViewClose: document.querySelector("#quick-view-close"),
    cartToggle: document.querySelector("#cart-toggle"),
    cartCount: document.querySelector("#cart-count"),
    cartDrawer: document.querySelector("#cart-drawer"),
    cartBackdrop: document.querySelector("#cart-backdrop"),
    cartClose: document.querySelector("#cart-close"),
    cartContent: document.querySelector("#cart-content"),
    cartFooter: document.querySelector("#cart-footer"),
    cartLiveRegion: document.querySelector("#cart-live-region"),
    liveRegion: document.querySelector("#marketplace-live-region"),
    resultsAnchor: document.querySelector("#results-anchor"),
    browseHeading: document.querySelector("#browse-heading")
  };

  const storageKeys = {
    apiCache: "thebridge:openlibrary-cache",
    metadataCache: "thebridge:book-metadata-cache",
    coverCache: "thebridge:resolved-covers",
    saved: "thebridge:saved-listings",
    recent: "thebridge:recent-searches",
    cart: "thebridge:cart",
    lastDemoRequest: "thebridge:last-demo-request"
  };

  const serviceFees = { Exchange: 4900, Loan: 3900, Rental: 3900 };
  const genreEmoji = {
    "Science Fiction": "🚀", Dystopian: "🌆", Fantasy: "🧙", Classic: "🏛️", History: "🏺",
    Memoir: "📝", Contemporary: "✨", "Self Help": "🌱", Romance: "💕", Fiction: "📖",
    "Historical Fiction": "🕰️", Mystery: "🕵️", Thriller: "⚡", Horror: "👻", Biography: "👤"
  };
  const modalityEmoji = { Exchange: "🔄", Loan: "🤝", Rental: "🗓️", Sale: "💳" };
  const conditionEmoji = { "Like new": "✨", "Good condition": "👍", "Used copy": "📚" };
  const genreColors = {
    "Science Fiction": "#2563EB",
    Dystopian: "#334155",
    Fantasy: "#7C3AED",
    Classic: "#A16207",
    History: "#B45309",
    Memoir: "#0F766E",
    Contemporary: "#DB2777",
    "Self Help": "#16A34A",
    Romance: "#E11D48",
    Fiction: "#4F46E5",
    "Historical Fiction": "#9A3412",
    Mystery: "#0F766E",
    Thriller: "#B91C1C",
    Horror: "#111827",
    Biography: "#475569",
    Default: "#64748B"
  };

  const inferGenre = (values) => {
    const text = normalize(Array.isArray(values) ? values.join(" ") : values);
    const checks = [
      ["science fiction", "Science Fiction"],
      ["dystop", "Dystopian"],
      ["fantasy", "Fantasy"],
      ["romance", "Romance"],
      ["history", "History"],
      ["historical", "Historical Fiction"],
      ["memoir", "Memoir"],
      ["biograph", "Biography"],
      ["mystery", "Mystery"],
      ["thriller", "Thriller"],
      ["horror", "Horror"],
      ["self help", "Self Help"],
      ["contemporary", "Contemporary"],
      ["classic", "Classic"],
      ["fiction", "Fiction"]
    ];
    return checks.find(([keyword]) => text.includes(keyword))?.[1] || "Default";
  };

  const getGenreColor = (genre) => genreColors[genre] || genreColors[inferGenre(genre)] || genreColors.Default;
  const modalityStyles = {
    Exchange: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    Loan: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    Rental: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    Sale: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
  };

  const readJson = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  };

  const writeJson = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  };

  const state = {
    searchTerm: "",
    modality: "All",
    genre: "All",
    author: "All",
    year: "All",
    condition: "All",
    sort: "Recommended",
    savedOnly: false,
    savedIds: new Set(readJson(storageKeys.saved, [])),
    cartIds: readJson(storageKeys.cart, []).filter((id) => listings.some((listing) => listing.id === id)),
    apiResults: [],
    apiStatus: "idle",
    apiCached: false,
    apiRequestId: 0,
    apiTimer: null,
    selectedListingId: null,
    selectedApiIndex: null,
    lastFocusedElement: null,
    cartLastFocusedElement: null
  };

  const normalize = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character]));
  const formatCurrency = (value) => new Intl.NumberFormat("en-CO", { style: "currency", currency: "COP", currencyDisplay: "code", maximumFractionDigits: 0 }).format(value || 0);

  const getOfferSummary = (listing) => {
    if (listing.modality === "Exchange") return listing.desiredBook ? `🎯 Wants ${listing.desiredBook}` : "🎯 Open to offers";
    if (listing.modality === "Loan") return `⏳ ${listing.duration || "Duration to agree"}`;
    if (listing.modality === "Rental") return `${formatCurrency(listing.price)} · ${listing.duration}`;
    return formatCurrency(listing.price);
  };

  const getListingAmount = (listing) => ["Sale", "Rental"].includes(listing.modality) ? Number(listing.price || 0) : 0;
  const getServiceFee = (listing) => listing.modality === "Sale" ? Math.max(2500, Math.round(Number(listing.price || 0) * 0.05)) : serviceFees[listing.modality] || 0;
  const getCartTotalForListing = (listing) => getListingAmount(listing) + getServiceFee(listing);
  const getCartActionLabel = (listing) => listing.modality === "Exchange" ? "Review exchange" : listing.modality === "Loan" ? "Review loan" : listing.modality === "Rental" ? "Add rental" : "Add to cart";

  const hasActiveFilters = () => state.modality !== "All" || state.genre !== "All" || state.author !== "All" || state.year !== "All" || state.condition !== "All" || state.savedOnly;

  const getFilteredListings = () => {
    const term = normalize(state.searchTerm);
    return listings.filter((listing) => {
      const searchable = normalize(`${listing.title} ${listing.author} ${listing.genre} ${listing.isbn}`);
      return (!term || searchable.includes(term))
        && (state.modality === "All" || listing.modality === state.modality)
        && (state.genre === "All" || listing.genre === state.genre)
        && (state.author === "All" || listing.author === state.author)
        && (state.year === "All" || String(listing.year) === state.year)
        && (state.condition === "All" || listing.condition === state.condition)
        && (!state.savedOnly || state.savedIds.has(listing.id));
    });
  };

  const getSortedListings = (filteredListings) => {
    const sorted = [...filteredListings];
    const sorters = {
      Recommended: (a, b) => {
        const priority = { Exchange: 4, Loan: 3, Rental: 2, Sale: 1 };
        return priority[b.modality] - priority[a.modality] || new Date(b.createdAt) - new Date(a.createdAt);
      },
      Newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      "Price: Low to High": (a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY),
      "Price: High to Low": (a, b) => (b.price ?? -1) - (a.price ?? -1),
      "Title A-Z": (a, b) => a.title.localeCompare(b.title)
    };
    return sorted.sort(sorters[state.sort] || sorters.Recommended);
  };

  const computeStats = (filteredListings) => filteredListings.reduce((stats, listing) => {
    stats.total += 1;
    stats.byModality[listing.modality] = (stats.byModality[listing.modality] || 0) + 1;
    if (typeof listing.price === "number") {
      stats.priceTotal += listing.price;
      stats.pricedCount += 1;
    }
    return stats;
  }, { total: 0, byModality: {}, priceTotal: 0, pricedCount: 0 });

  const createIcon = (path, className = "h-5 w-5") => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${path}</svg>`;
  const heartIcon = (filled) => filled ? createIcon('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" fill="currentColor"/>') : createIcon('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/>');
  const cartIcon = () => createIcon('<path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.4 8H7.1"/><circle cx="10" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/>');

  const resolveCoverFromOpenLibrary = async (listing) => {
    const cache = readJson(storageKeys.coverCache, {});
    if (cache[listing.id]) return cache[listing.id];
    if (!navigator.onLine) return null;
    const endpoint = new URL("https://openlibrary.org/search.json");
    endpoint.searchParams.set("title", listing.title);
    endpoint.searchParams.set("author", listing.author);
    endpoint.searchParams.set("limit", "1");
    endpoint.searchParams.set("fields", "cover_i");
    try {
      const response = await fetch(endpoint);
      if (!response.ok) return null;
      const data = await response.json();
      const coverId = data.docs?.[0]?.cover_i;
      if (!coverId) return null;
      const url = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`;
      cache[listing.id] = url;
      writeJson(storageKeys.coverCache, cache);
      return url;
    } catch {
      return null;
    }
  };

  const revealCoverFallback = (image) => {
    image.classList.add("hidden");
    image.closest("[data-cover-shell]")?.querySelector("[data-cover-fallback]")?.classList.remove("hidden");
  };

  const attachListingCoverFallback = (image) => {
    if (!image || image.dataset.coverBound === "true") return;
    image.dataset.coverBound = "true";
    image.addEventListener("error", async () => {
      const listing = listings.find((item) => item.id === image.dataset.listingCoverId);
      if (!listing) {
        revealCoverFallback(image);
        return;
      }
      if (image.dataset.coverStage === "isbn") {
        image.dataset.coverStage = "resolved";
        const resolved = await resolveCoverFromOpenLibrary(listing);
        if (resolved) {
          image.src = resolved;
          return;
        }
      }
      revealCoverFallback(image);
    });
  };

  const attachApiCoverFallback = (image) => {
    if (!image || image.dataset.coverBound === "true") return;
    image.dataset.coverBound = "true";
    image.addEventListener("error", () => revealCoverFallback(image), { once: true });
  };

  const coverShell = ({ src, alt, color, imageAttributes = "", imageClass = "" }) => `<div data-cover-shell class="relative h-full w-full overflow-hidden" style="background:${color}"><div data-cover-fallback class="${src ? "hidden " : ""}absolute inset-0" style="background:${color}"></div>${src ? `<img src="${src}" ${imageAttributes} alt="${escapeHtml(alt)}" class="${imageClass} h-full w-full object-cover">` : ""}</div>`;

  const createCardMarkup = (listing) => {
    const saved = state.savedIds.has(listing.id);
    const coverSource = listing.cover || "";
    const cover = coverShell({
      src: coverSource,
      alt: `Cover of ${listing.title} by ${listing.author}`,
      color: getGenreColor(listing.genre),
      imageAttributes: `data-listing-cover-id="${listing.id}" data-cover-stage="isbn"`,
      imageClass: "transition duration-300 group-hover:scale-[1.025]"
    });
    return `<article class="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/70">
      <div class="relative aspect-[2/3] overflow-hidden">${cover}<button type="button" class="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:scale-105 hover:text-rose-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-200" data-save-id="${listing.id}" aria-label="${saved ? "Remove" : "Save"} ${escapeHtml(listing.title)} ${saved ? "from" : "to"} favorites">${heartIcon(saved)}</button><button type="button" class="absolute inset-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-blue-500/30" data-open-listing="${listing.id}" aria-label="Quick view for ${escapeHtml(listing.title)}"></button></div>
      <div class="space-y-3 p-4"><div class="min-w-0"><h3 class="truncate text-base font-extrabold tracking-tight text-slate-950 dark:text-white">${escapeHtml(listing.title)}</h3><p class="truncate text-sm text-slate-500 dark:text-slate-400">${escapeHtml(listing.author)}</p></div><div class="flex flex-wrap items-center gap-2"><span class="rounded-full px-2.5 py-1 text-xs font-bold ${modalityStyles[listing.modality]}">${modalityEmoji[listing.modality]} ${listing.modality}</span><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">${conditionEmoji[listing.condition] || "📚"} ${listing.condition}</span></div><div class="flex items-end justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800"><p class="min-w-0 truncate text-sm font-bold text-slate-800 dark:text-slate-100">${escapeHtml(getOfferSummary(listing))}</p><button type="button" class="shrink-0 text-sm font-bold text-blue-600 hover:text-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:text-blue-400" data-open-listing="${listing.id}">View</button></div></div>
    </article>`;
  };

  const getApiAuthor = (book) => Array.isArray(book.author_name) ? book.author_name[0] : "Unknown author";
  const getApiCover = (book, size = "M") => book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg?default=false` : "";
  const getApiSubjects = (book) => Array.isArray(book.subject) ? book.subject.slice(0, 5) : [];
  const getApiGenre = (book) => inferGenre(getApiSubjects(book));
  const isAlreadyListed = (book) => listings.some((listing) => normalize(listing.title) === normalize(book.title));

  const unavailableCardMarkup = (book, index) => {
    const author = getApiAuthor(book);
    const subjects = getApiSubjects(book);
    const coverUrl = getApiCover(book);
    const cover = coverShell({
      src: coverUrl,
      alt: `Open Library cover for ${book.title || "book result"}`,
      color: getGenreColor(getApiGenre(book)),
      imageAttributes: "data-api-cover-fallback",
      imageClass: ""
    });
    return `<article class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="relative aspect-[2/3] overflow-hidden">${cover}<span class="absolute left-3 top-3 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-800 shadow-sm dark:border-amber-800/70 dark:bg-amber-950/75 dark:text-amber-300">No current listings</span></div>
      <div class="p-4"><h3 class="line-clamp-2 text-base font-black text-slate-950 dark:text-white">${escapeHtml(book.title || "Untitled")}</h3><p class="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">${escapeHtml(author)}</p><div class="mt-3 flex flex-wrap gap-2"><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">📅 ${book.first_publish_year || "Unknown year"}</span>${subjects[0] ? `<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">${genreEmoji[inferGenre(subjects[0])] || "📖"} ${escapeHtml(subjects[0])}</span>` : ""}</div><p class="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">Open Library found the title, but no student is offering a physical copy on TheBridge right now.</p><button type="button" data-open-api-book="${index}" class="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-extrabold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-300">View book information</button></div>
    </article>`;
  };

  const getUnavailableApiResults = (localResults) => {
    if (state.searchTerm.trim().length < 3 || localResults.length > 0 || state.apiStatus !== "success") return [];
    return state.apiResults.filter((book) => book?.title && !isAlreadyListed(book)).slice(0, 4);
  };

  const renderApiDiscovery = (localResults) => {
    const query = state.searchTerm.trim();
    const listedMatches = state.apiResults.filter((book) => book?.title && isAlreadyListed(book));
    const hiddenByFilters = query.length >= 3 && localResults.length === 0 && listedMatches.length > 0;
    if (hiddenByFilters) {
      elements.apiDiscovery.classList.remove("hidden");
      elements.apiDiscovery.innerHTML = `<div class="rounded-3xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/25"><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p class="font-black text-blue-900 dark:text-blue-100">A community listing matches this book</p><p class="mt-1 text-sm text-blue-800/75 dark:text-blue-200/75">One or more active filters are hiding it.</p></div><button id="api-clear-active-filters" type="button" class="shrink-0 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20">Clear filters</button></div></div>`;
      elements.apiDiscovery.querySelector("#api-clear-active-filters")?.addEventListener("click", resetFilters);
      return;
    }
    if (query.length >= 3 && localResults.length === 0 && state.apiStatus === "error") {
      elements.apiDiscovery.classList.remove("hidden");
      elements.apiDiscovery.innerHTML = `<div class="rounded-3xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/60 dark:bg-rose-950/25"><p class="font-black text-rose-800 dark:text-rose-200">The public catalog could not be checked</p><p class="mt-1 text-sm text-rose-700/80 dark:text-rose-300/80">The local marketplace still works. Try the search again when the connection is available.</p></div>`;
      return;
    }
    elements.apiDiscovery.classList.add("hidden");
    elements.apiDiscovery.innerHTML = "";
  };

  const renderMarketplace = () => {
    const filtered = getFilteredListings();
    const sorted = getSortedListings(filtered);
    const stats = computeStats(filtered);
    const unavailable = getUnavailableApiResults(sorted);
    const searchingPublicCatalog = state.searchTerm.trim().length >= 3 && sorted.length === 0 && state.apiStatus === "loading";
    const averagePrice = stats.pricedCount ? Math.round(stats.priceTotal / stats.pricedCount) : 0;

    if (sorted.length) {
      elements.grid.innerHTML = sorted.map(createCardMarkup).join("");
      elements.browseHeading.textContent = "Available now";
    } else if (unavailable.length) {
      elements.grid.innerHTML = unavailable.map((book) => unavailableCardMarkup(book, state.apiResults.indexOf(book))).join("");
      elements.browseHeading.textContent = "Book found — no current listing";
    } else if (searchingPublicCatalog) {
      elements.grid.innerHTML = Array.from({ length: 4 }, () => `<article class="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"><div class="aspect-[2/3] rounded-2xl bg-slate-200 dark:bg-slate-800"></div><div class="mt-4 h-4 rounded bg-slate-200 dark:bg-slate-800"></div><div class="mt-2 h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-800"></div></article>`).join("");
      elements.browseHeading.textContent = "Checking the public book catalog";
    } else {
      elements.grid.innerHTML = "";
      elements.browseHeading.textContent = "Available now";
    }

    const hasCards = sorted.length > 0 || unavailable.length > 0 || searchingPublicCatalog;
    elements.grid.classList.toggle("hidden", !hasCards);
    renderApiDiscovery(sorted);
    elements.emptyState.classList.toggle("hidden", hasCards || (!state.searchTerm.trim() && !hasActiveFilters()));
    elements.resultsSummary.textContent = sorted.length
      ? `${stats.total} ${stats.total === 1 ? "community book" : "community books"} found`
      : unavailable.length
        ? `${unavailable.length} catalog ${unavailable.length === 1 ? "match" : "matches"} · not currently listed`
        : searchingPublicCatalog
          ? "Checking Open Library…"
          : "No matching community books";
    const exchangeCount = stats.byModality.Exchange || 0;
    elements.statsSummary.textContent = averagePrice
      ? `${exchangeCount} exchange options · Average paid listing ${formatCurrency(averagePrice)}`
      : `${exchangeCount} exchange options`;

    elements.grid.querySelectorAll("[data-open-listing]").forEach((button) => button.addEventListener("click", () => openQuickView(button.dataset.openListing)));
    elements.grid.querySelectorAll("[data-save-id]").forEach((button) => button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleSaved(button.dataset.saveId);
    }));
    elements.grid.querySelectorAll("[data-open-api-book]").forEach((button) => button.addEventListener("click", () => openApiBookQuickView(Number(button.dataset.openApiBook))));
    elements.grid.querySelectorAll("img[data-listing-cover-id]").forEach(attachListingCoverFallback);
    elements.grid.querySelectorAll("img[data-api-cover-fallback]").forEach(attachApiCoverFallback);
    elements.liveRegion.textContent = sorted.length
      ? `${stats.total} community marketplace results shown.`
      : unavailable.length
        ? `${unavailable.length} book catalog matches shown with no current TheBridge listings.`
        : "No marketplace result is currently available.";
  };

  const toggleSaved = (id) => {
    if (state.savedIds.has(id)) state.savedIds.delete(id);
    else state.savedIds.add(id);
    writeJson(storageKeys.saved, [...state.savedIds]);
    renderMarketplace();
    if (state.selectedListingId === id) openQuickView(id);
  };

  const metadataSkeleton = () => `<div class="space-y-3 animate-pulse"><div class="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800"></div><div class="grid grid-cols-2 gap-3"><div class="h-16 rounded-2xl bg-slate-100 dark:bg-slate-900"></div><div class="h-16 rounded-2xl bg-slate-100 dark:bg-slate-900"></div></div><div class="h-20 rounded-2xl bg-slate-100 dark:bg-slate-900"></div></div>`;

  const quickViewMarkup = (listing) => {
    const saved = state.savedIds.has(listing.id);
    const coverSource = listing.cover || "";
    const officialCover = coverShell({
      src: coverSource,
      alt: `Cover of ${listing.title} by ${listing.author}`,
      color: getGenreColor(listing.genre),
      imageAttributes: `data-listing-cover-id="${listing.id}" data-cover-stage="isbn"`,
      imageClass: ""
    });
    return `<div class="space-y-6">
      <div><div class="flex flex-wrap gap-2"><span class="rounded-full px-2.5 py-1 text-xs font-bold ${modalityStyles[listing.modality]}">${modalityEmoji[listing.modality]} ${listing.modality}</span><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">${conditionEmoji[listing.condition] || "📚"} ${listing.condition}</span></div><h2 class="mt-3 text-2xl font-black tracking-tight">${escapeHtml(listing.title)}</h2><p class="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">${escapeHtml(listing.author)}</p><p class="mt-3 text-lg font-extrabold">${escapeHtml(getOfferSummary(listing))}</p></div>
      <section class="grid gap-4 sm:grid-cols-[180px_1fr]" aria-labelledby="copy-media-heading"><div><p class="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Official cover</p><div class="aspect-[2/3] overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">${officialCover}</div></div><div class="min-w-0"><div class="mb-2 flex items-center justify-between gap-3"><p id="copy-media-heading" class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Seller photos</p><span class="text-[11px] font-bold text-slate-400">Physical copy</span></div><img id="seller-photo-main" src="${listing.sellerPhotos[0]}" alt="Seller photo showing the physical condition of ${escapeHtml(listing.title)}" class="aspect-[4/3] w-full rounded-2xl border border-slate-200 object-cover dark:border-slate-800"><div class="mt-2 grid grid-cols-3 gap-2">${listing.sellerPhotos.map((photo, index) => `<button type="button" data-seller-photo="${photo}" aria-label="Show seller photo ${index + 1}" class="overflow-hidden rounded-xl border ${index === 0 ? "border-indigo-400" : "border-slate-200 dark:border-slate-800"} focus:outline-none focus:ring-4 focus:ring-indigo-500/15"><img src="${photo}" alt="" class="aspect-[16/9] w-full object-cover"></button>`).join("")}</div></div></section>
      <section class="rounded-3xl border border-slate-200 p-4 dark:border-slate-800" aria-labelledby="official-book-heading"><div class="flex items-center justify-between gap-3"><div><p class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">Open Library</p><h3 id="official-book-heading" class="mt-1 font-black">Official book information</h3></div><span class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">Bibliographic data</span></div><div id="book-api-metadata" class="mt-4">${metadataSkeleton()}</div></section>
      <section class="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900" aria-labelledby="copy-heading"><h3 id="copy-heading" class="text-sm font-extrabold">About this physical copy</h3><p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">${escapeHtml(listing.description)}</p></section>
      <section class="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><div class="flex items-center justify-between gap-4"><div><h3 class="font-extrabold">${escapeHtml(listing.owner)}</h3><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">${escapeHtml(listing.university)}</p></div><p class="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300"><span class="h-2 w-2 rounded-full bg-emerald-500"></span>${listing.status}</p></div></section>
      <div class="grid grid-cols-2 gap-3"><button type="button" class="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-extrabold transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:hover:bg-slate-900" data-save-quick="${listing.id}">${heartIcon(saved)} ${saved ? "Saved" : "Save"}</button><button type="button" class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-blue-500/25" data-add-cart="${listing.id}">${cartIcon()} ${getCartActionLabel(listing)}</button></div>
    </div>`;
  };

  const descriptionText = (description) => typeof description === "string" ? description : description?.value || "No public description is available for this edition.";

  const fetchBookMetadata = async (listing) => {
    const cache = readJson(storageKeys.metadataCache, {});
    const key = listing.isbn || normalize(`${listing.title}-${listing.author}`);
    if (cache[key]) return cache[key];
    if (!navigator.onLine) return null;
    const endpoint = new URL("https://openlibrary.org/search.json");
    if (listing.isbn) endpoint.searchParams.set("isbn", listing.isbn);
    else {
      endpoint.searchParams.set("title", listing.title);
      endpoint.searchParams.set("author", listing.author);
    }
    endpoint.searchParams.set("limit", "1");
    endpoint.searchParams.set("fields", "key,title,author_name,first_publish_year,cover_i,isbn,subject,publisher,language,number_of_pages_median,edition_count");
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("metadata");
      const data = await response.json();
      const doc = data.docs?.[0];
      if (!doc) return null;
      let work = null;
      if (doc.key?.startsWith("/works/")) {
        try {
          const workResponse = await fetch(`https://openlibrary.org${doc.key}.json`);
          if (workResponse.ok) work = await workResponse.json();
        } catch {
          work = null;
        }
      }
      const metadata = {
        title: doc.title || listing.title,
        author: getApiAuthor(doc),
        year: doc.first_publish_year || listing.year,
        publishers: Array.isArray(doc.publisher) ? doc.publisher.slice(0, 3) : [],
        languages: Array.isArray(doc.language) ? doc.language.slice(0, 4) : [],
        pages: doc.number_of_pages_median || null,
        editions: doc.edition_count || null,
        subjects: Array.isArray(doc.subject) ? doc.subject.slice(0, 8) : Array.isArray(work?.subjects) ? work.subjects.slice(0, 8) : [],
        description: descriptionText(work?.description),
        workKey: doc.key || null
      };
      cache[key] = metadata;
      writeJson(storageKeys.metadataCache, cache);
      return metadata;
    } catch {
      return null;
    }
  };

  const renderBookMetadata = (container, metadata, listing) => {
    if (!container) return;
    if (!metadata) {
      container.innerHTML = `<div class="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-500 dark:bg-slate-900 dark:text-slate-400">Official metadata is unavailable right now. The student listing remains fully usable.</div>`;
      return;
    }
    const subjects = metadata.subjects.length
      ? metadata.subjects.slice(0, 6).map((subject) => `<span class="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">${escapeHtml(subject)}</span>`).join("")
      : '<span class="text-xs text-slate-400">No subjects available</span>';
    const languages = metadata.languages.length ? metadata.languages.map((language) => language.toUpperCase()).join(", ") : listing.language || "Unknown";
    container.innerHTML = `<dl class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3"><div class="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">First published</dt><dd class="mt-1 font-extrabold">${metadata.year || listing.year}</dd></div><div class="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">Median pages</dt><dd class="mt-1 font-extrabold">${metadata.pages || "Unknown"}</dd></div><div class="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">Editions</dt><dd class="mt-1 font-extrabold">${metadata.editions || "Unknown"}</dd></div><div class="col-span-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">Publisher</dt><dd class="mt-1 line-clamp-2 font-extrabold">${escapeHtml(metadata.publishers[0] || listing.publisher || "Unknown")}</dd></div><div class="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">Language</dt><dd class="mt-1 font-extrabold">${escapeHtml(languages)}</dd></div></dl><div class="mt-3 flex flex-wrap gap-2">${subjects}</div><p class="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">${escapeHtml(metadata.description)}</p>`;
  };

  async function openQuickView(id) {
    const listing = listings.find((item) => item.id === id);
    if (!listing) return;
    state.selectedListingId = id;
    state.selectedApiIndex = null;
    state.lastFocusedElement = document.activeElement;
    elements.quickViewContent.innerHTML = quickViewMarkup(listing);
    elements.quickView.classList.remove("translate-x-full");
    elements.quickViewBackdrop.classList.remove("hidden");
    elements.quickView.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    elements.quickViewContent.querySelectorAll("img[data-listing-cover-id]").forEach(attachListingCoverFallback);
    elements.quickViewClose.focus();
    elements.quickViewContent.querySelector("[data-save-quick]")?.addEventListener("click", () => toggleSaved(id));
    elements.quickViewContent.querySelector("[data-add-cart]")?.addEventListener("click", () => addToCart(id));
    const sellerPhotoMain = elements.quickViewContent.querySelector("#seller-photo-main");
    const sellerPhotoButtons = elements.quickViewContent.querySelectorAll("[data-seller-photo]");
    sellerPhotoButtons.forEach((button) => button.addEventListener("click", () => {
      sellerPhotoMain.src = button.dataset.sellerPhoto;
      sellerPhotoButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("border-indigo-400", active);
        item.classList.toggle("border-slate-200", !active);
        item.classList.toggle("dark:border-slate-800", !active);
      });
    }));
    const metadata = await fetchBookMetadata(listing);
    if (state.selectedListingId === id) renderBookMetadata(elements.quickViewContent.querySelector("#book-api-metadata"), metadata, listing);
  }

  const apiQuickViewMarkup = (book) => {
    const author = getApiAuthor(book);
    const subjects = getApiSubjects(book);
    const isbn = Array.isArray(book.isbn) ? book.isbn[0] : "Unavailable";
    const publishers = Array.isArray(book.publisher) ? book.publisher.slice(0, 2).join(", ") : "Unknown";
    const languages = Array.isArray(book.language) ? book.language.slice(0, 4).map((value) => String(value).toUpperCase()).join(", ") : "Unknown";
    const cover = coverShell({
      src: getApiCover(book, "L"),
      alt: `Open Library cover for ${book.title || "book"}`,
      color: getGenreColor(getApiGenre(book)),
      imageAttributes: "data-api-cover-fallback",
      imageClass: ""
    });
    return `<div class="space-y-6"><div><span class="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-extrabold text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">No current TheBridge listing</span><h2 class="mt-3 text-2xl font-black tracking-tight">${escapeHtml(book.title || "Untitled")}</h2><p class="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">${escapeHtml(author)}</p></div><div class="grid gap-5 sm:grid-cols-[170px_1fr]"><div class="aspect-[2/3] overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">${cover}</div><div class="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900"><p class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Availability</p><h3 class="mt-2 font-black">Bibliographic record only</h3><p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Open Library recognizes this title, but no student has published a physical copy on TheBridge. Exchange, loan, rental, and purchase actions remain unavailable until a listing exists.</p></div></div><dl class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3"><div class="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">First published</dt><dd class="mt-1 font-extrabold">${book.first_publish_year || "Unknown"}</dd></div><div class="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">Median pages</dt><dd class="mt-1 font-extrabold">${book.number_of_pages_median || "Unknown"}</dd></div><div class="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">Editions</dt><dd class="mt-1 font-extrabold">${book.edition_count || "Unknown"}</dd></div><div class="col-span-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">Publisher</dt><dd class="mt-1 line-clamp-2 font-extrabold">${escapeHtml(publishers)}</dd></div><div class="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">Language</dt><dd class="mt-1 truncate font-extrabold">${escapeHtml(languages)}</dd></div><div class="col-span-2 sm:col-span-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><dt class="text-xs font-bold text-slate-400">ISBN</dt><dd class="mt-1 truncate font-extrabold">${escapeHtml(isbn)}</dd></div></dl><div><h3 class="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Subjects</h3><div class="mt-3 flex flex-wrap gap-2">${subjects.length ? subjects.map((subject) => `<span class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">${escapeHtml(subject)}</span>`).join("") : '<span class="text-sm text-slate-400">No subjects returned.</span>'}</div></div><section class="rounded-3xl border border-slate-200 p-4 dark:border-slate-800"><p class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">Open Library work record</p><h3 class="mt-1 font-black">About this book</h3><div id="api-work-description" class="mt-3">${metadataSkeleton()}</div></section><div class="rounded-3xl border border-indigo-200 bg-indigo-50 p-4 text-sm leading-6 text-indigo-900 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-indigo-200"><strong>Not available yet.</strong> A student needs to add and publish a physical copy before this title can be requested through TheBridge.</div><button type="button" id="api-clear-search" class="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950">Return to all community books</button></div>`;
  };

  const fetchApiWorkDescription = async (book) => {
    if (!book?.key?.startsWith("/works/") || !navigator.onLine) return null;
    try {
      const response = await fetch(`https://openlibrary.org${book.key}.json`);
      if (!response.ok) return null;
      const work = await response.json();
      return descriptionText(work.description);
    } catch {
      return null;
    }
  };

  async function openApiBookQuickView(index) {
    const book = state.apiResults[index];
    if (!book) return;
    state.selectedListingId = null;
    state.selectedApiIndex = index;
    state.lastFocusedElement = document.activeElement;
    elements.quickViewContent.innerHTML = apiQuickViewMarkup(book);
    elements.quickView.classList.remove("translate-x-full");
    elements.quickViewBackdrop.classList.remove("hidden");
    elements.quickView.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    elements.quickViewContent.querySelectorAll("img[data-api-cover-fallback]").forEach(attachApiCoverFallback);
    elements.quickViewContent.querySelector("#api-clear-search")?.addEventListener("click", () => { closeQuickView(); resetFilters(); });
    elements.quickViewClose.focus();
    const description = await fetchApiWorkDescription(book);
    if (state.selectedApiIndex !== index) return;
    const descriptionContainer = elements.quickViewContent.querySelector("#api-work-description");
    if (descriptionContainer) descriptionContainer.innerHTML = `<p class="text-sm leading-6 text-slate-600 dark:text-slate-300">${escapeHtml(description || "No public description is available for this work.")}</p>`;
  }

  const closeQuickView = () => {
    if (elements.quickView.getAttribute("aria-hidden") === "true") return;
    elements.quickView.classList.add("translate-x-full");
    elements.quickViewBackdrop.classList.add("hidden");
    elements.quickView.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
    state.selectedListingId = null;
    state.selectedApiIndex = null;
    if (state.lastFocusedElement instanceof HTMLElement) state.lastFocusedElement.focus();
    state.lastFocusedElement = null;
  };

  const syncCart = () => {
    writeJson(storageKeys.cart, state.cartIds);
    const count = state.cartIds.length;
    elements.cartCount.textContent = String(count);
    elements.cartCount.classList.toggle("hidden", count === 0);
    elements.cartToggle.setAttribute("aria-label", count ? `Open review cart with ${count} ${count === 1 ? "item" : "items"}` : "Open review cart");
    window.dispatchEvent(new CustomEvent("thebridge:cart-change"));
  };

  const addToCart = (id) => {
    if (!state.cartIds.includes(id)) state.cartIds.push(id);
    syncCart();
    renderCart();
    elements.cartLiveRegion.textContent = "Listing added to the review cart.";
    closeQuickView();
    openCart();
  };

  const removeFromCart = (id) => {
    state.cartIds = state.cartIds.filter((cartId) => cartId !== id);
    syncCart();
    renderCart();
    elements.cartLiveRegion.textContent = "Listing removed from the review cart.";
  };

  const getCartListings = () => state.cartIds.map((id) => listings.find((listing) => listing.id === id)).filter(Boolean);
  const computeCartTotals = (cartListings) => cartListings.reduce((totals, listing) => {
    totals.listingAmount += getListingAmount(listing);
    totals.serviceFees += getServiceFee(listing);
    totals.total += getCartTotalForListing(listing);
    return totals;
  }, { listingAmount: 0, serviceFees: 0, total: 0 });

  const cartItemMarkup = (listing) => {
    const cover = coverShell({
      src: listing.cover || "",
      alt: `Cover of ${listing.title}`,
      color: getGenreColor(listing.genre),
      imageAttributes: `data-listing-cover-id="${listing.id}" data-cover-stage="isbn"`,
      imageClass: ""
    });
    return `<article class="rounded-3xl border border-slate-200 p-4 dark:border-slate-800"><div class="flex gap-4"><div class="h-28 w-[74px] shrink-0 overflow-hidden rounded-xl">${cover}</div><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-3"><div><h3 class="font-black">${escapeHtml(listing.title)}</h3><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">${escapeHtml(listing.author)}</p></div><button type="button" class="rounded-lg px-2 py-1 text-xs font-extrabold text-rose-600 hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-500/15 dark:text-rose-300 dark:hover:bg-rose-500/10" data-remove-cart="${listing.id}">Remove</button></div><div class="mt-3 flex flex-wrap gap-2"><span class="rounded-full px-2.5 py-1 text-[11px] font-bold ${modalityStyles[listing.modality]}">${modalityEmoji[listing.modality]} ${listing.modality}</span><span class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">${conditionEmoji[listing.condition] || "📚"} ${listing.condition}</span></div><dl class="mt-3 space-y-1 text-xs"><div class="flex justify-between gap-3"><dt class="text-slate-500 dark:text-slate-400">Listing amount</dt><dd class="font-extrabold">${getListingAmount(listing) ? formatCurrency(getListingAmount(listing)) : "COP 0"}</dd></div><div class="flex justify-between gap-3"><dt class="text-slate-500 dark:text-slate-400">TheBridge service fee</dt><dd class="font-extrabold">${formatCurrency(getServiceFee(listing))}</dd></div></dl></div></div></article>`;
  };

  const renderCart = () => {
    const cartListings = getCartListings();
    syncCart();
    if (!cartListings.length) {
      elements.cartContent.innerHTML = `<div class="flex min-h-[420px] flex-col items-center justify-center text-center"><div class="grid h-16 w-16 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">${cartIcon()}</div><h3 class="mt-5 text-xl font-black">Your review cart is empty</h3><p class="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">Open a listing and review its Exchange, Loan, Rental, or Sale request here before confirming the simulated flow.</p></div>`;
      elements.cartFooter.innerHTML = `<p class="text-xs leading-5 text-slate-500 dark:text-slate-400">Milestone 1 uses simulated frontend state only. No payment or transaction is processed.</p>`;
      return;
    }
    const totals = computeCartTotals(cartListings);
    elements.cartContent.innerHTML = `<div class="space-y-3">${cartListings.map(cartItemMarkup).join("")}</div><div class="mt-5 rounded-3xl bg-slate-50 p-4 dark:bg-slate-900"><div class="flex items-start gap-3"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-100 text-lg dark:bg-indigo-500/10">🏫</span><div><p class="text-sm font-black">Campus meetup</p><p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">The prototype assumes an in-person handoff inside the academic community. Delivery charge: COP 0.</p></div></div></div>`;
    elements.cartContent.querySelectorAll("img[data-listing-cover-id]").forEach(attachListingCoverFallback);
    elements.cartContent.querySelectorAll("[data-remove-cart]").forEach((button) => button.addEventListener("click", () => removeFromCart(button.dataset.removeCart)));
    elements.cartFooter.innerHTML = `<dl class="space-y-2 text-sm"><div class="flex justify-between gap-4"><dt class="text-slate-500 dark:text-slate-400">Books / rentals</dt><dd class="font-extrabold">${formatCurrency(totals.listingAmount)}</dd></div><div class="flex justify-between gap-4"><dt class="text-slate-500 dark:text-slate-400">TheBridge service fees</dt><dd class="font-extrabold">${formatCurrency(totals.serviceFees)}</dd></div><div class="flex justify-between gap-4 border-t border-slate-200 pt-3 text-base dark:border-slate-800"><dt class="font-black">Prototype total</dt><dd class="font-black">${formatCurrency(totals.total)}</dd></div></dl><div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/25 dark:text-amber-200">These are transparent prototype fees for the academic demo. Exchange: COP 4,900. Loan: COP 3,900. Rental: listing price + COP 3,900. Sale: listing price + 5% platform fee, minimum COP 2,500. No real payment is collected.</div><label class="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 p-3 text-xs font-semibold leading-5 dark:border-slate-800"><input id="cart-confirm-checkbox" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"><span>I understand this is a simulated request and no real payment will be processed.</span></label><p id="cart-confirm-error" class="mt-2 hidden text-xs font-bold text-rose-600 dark:text-rose-400" role="alert">Confirm the prototype notice before continuing.</p><button id="cart-confirm" type="button" class="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-blue-500/25">Confirm simulated request</button>`;
    elements.cartFooter.querySelector("#cart-confirm")?.addEventListener("click", confirmCart);
  };

  const confirmCart = () => {
    const checkbox = elements.cartFooter.querySelector("#cart-confirm-checkbox");
    const error = elements.cartFooter.querySelector("#cart-confirm-error");
    if (!checkbox?.checked) {
      error?.classList.remove("hidden");
      checkbox?.focus();
      return;
    }
    const cartListings = getCartListings();
    const totals = computeCartTotals(cartListings);
    writeJson(storageKeys.lastDemoRequest, { listingIds: cartListings.map(({ id }) => id), total: totals.total, createdAt: new Date().toISOString() });
    state.cartIds = [];
    syncCart();
    elements.cartContent.innerHTML = `<div class="flex min-h-[420px] flex-col items-center justify-center text-center"><div class="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-2xl dark:bg-emerald-500/10">✓</div><h3 class="mt-5 text-xl font-black">Request prepared</h3><p class="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">The simulated request was saved locally for the Milestone 1 interaction flow.</p></div>`;
    elements.cartFooter.innerHTML = `<button id="cart-success-close" type="button" class="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950">Continue browsing</button>`;
    elements.cartFooter.querySelector("#cart-success-close")?.addEventListener("click", closeCart);
    elements.cartLiveRegion.textContent = "Simulated request prepared successfully.";
  };

  const openCart = () => {
    state.cartLastFocusedElement = document.activeElement;
    renderCart();
    elements.cartDrawer.classList.remove("translate-x-full");
    elements.cartBackdrop.classList.remove("hidden");
    elements.cartDrawer.setAttribute("aria-hidden", "false");
    elements.cartToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
    elements.cartClose.focus();
  };

  const closeCart = () => {
    if (elements.cartDrawer.getAttribute("aria-hidden") === "true") return;
    elements.cartDrawer.classList.add("translate-x-full");
    elements.cartBackdrop.classList.add("hidden");
    elements.cartDrawer.setAttribute("aria-hidden", "true");
    elements.cartToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
    if (state.cartLastFocusedElement instanceof HTMLElement) state.cartLastFocusedElement.focus();
    state.cartLastFocusedElement = null;
  };

  const populateSelect = (select, values, getLabel) => {
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = getLabel(value);
      select.append(option);
    });
  };

  const setupFilters = () => {
    elements.genreFilter.options[0].value = "All";
    elements.authorFilter.options[0].value = "All";
    elements.yearFilter.options[0].value = "All";
    elements.conditionFilter.options[0].value = "All";
    populateSelect(elements.genreFilter, [...new Set(listings.map(({ genre }) => genre))].sort(), (value) => `${genreEmoji[value] || "📖"} ${value}`);
    populateSelect(elements.authorFilter, [...new Set(listings.map(({ author }) => author))].sort(), (value) => `👤 ${value}`);
    populateSelect(elements.yearFilter, [...new Set(listings.map(({ year }) => String(year)))].sort((a, b) => Number(b) - Number(a)), (value) => `📅 ${value}`);
    populateSelect(elements.conditionFilter, [...new Set(listings.map(({ condition }) => condition))].sort(), (value) => `${conditionEmoji[value] || "📚"} ${value}`);

    const updateFromSelects = () => {
      state.genre = elements.genreFilter.value;
      state.author = elements.authorFilter.value;
      state.year = elements.yearFilter.value;
      state.condition = elements.conditionFilter.value;
      state.sort = elements.sortFilter.value;
      renderMarketplace();
    };

    [elements.genreFilter, elements.authorFilter, elements.yearFilter, elements.conditionFilter, elements.sortFilter].forEach((select) => select.addEventListener("change", updateFromSelects));

    elements.modalityButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state.modality = button.dataset.modality;
        elements.modalityButtons.forEach((item) => {
          const active = item.dataset.modality === state.modality;
          item.classList.toggle("bg-slate-950", active);
          item.classList.toggle("text-white", active);
          item.classList.toggle("dark:bg-white", active);
          item.classList.toggle("dark:text-slate-950", active);
          item.classList.toggle("bg-white", !active);
          item.classList.toggle("text-slate-700", !active);
          item.classList.toggle("dark:bg-slate-900", !active);
          item.classList.toggle("dark:text-slate-200", !active);
          item.setAttribute("aria-pressed", String(active));
        });
        renderMarketplace();
      });
    });

    elements.savedButton.addEventListener("click", () => {
      state.savedOnly = !state.savedOnly;
      elements.savedButton.setAttribute("aria-pressed", String(state.savedOnly));
      elements.savedButton.classList.toggle("border-rose-300", state.savedOnly);
      elements.savedButton.classList.toggle("text-rose-600", state.savedOnly);
      elements.savedButton.classList.toggle("dark:border-rose-800", state.savedOnly);
      elements.savedButton.classList.toggle("dark:text-rose-300", state.savedOnly);
      renderMarketplace();
    });
  };

  const validateSearch = () => {
    const value = elements.searchInput.value.trim();
    const valid = value.length >= 2;
    elements.searchInput.setAttribute("aria-invalid", String(!valid));
    elements.searchError.classList.toggle("hidden", valid);
    if (!valid) elements.searchError.textContent = value ? "Enter at least 2 characters." : "Enter a title, author, genre, or ISBN.";
    return valid;
  };

  const readApiCache = () => readJson(storageKeys.apiCache, {});
  const writeApiCache = (query, data) => {
    const cache = readApiCache();
    cache[normalize(query)] = { data, savedAt: new Date().toISOString() };
    writeJson(storageKeys.apiCache, cache);
  };

  const setApiState = (type, message) => {
    if (type === "idle") {
      elements.apiState.classList.add("hidden");
      return;
    }
    elements.apiState.classList.remove("hidden");
    elements.apiStateText.textContent = message;
    const classes = {
      loading: ["border-blue-200", "bg-blue-50", "text-blue-700", "dark:border-blue-900/60", "dark:bg-blue-950/40", "dark:text-blue-300"],
      cached: ["border-amber-200", "bg-amber-50", "text-amber-800", "dark:border-amber-900/60", "dark:bg-amber-950/40", "dark:text-amber-300"],
      error: ["border-rose-200", "bg-rose-50", "text-rose-700", "dark:border-rose-900/60", "dark:bg-rose-950/40", "dark:text-rose-300"],
      success: ["border-emerald-200", "bg-emerald-50", "text-emerald-700", "dark:border-emerald-900/60", "dark:bg-emerald-950/40", "dark:text-emerald-300"]
    };
    Object.values(classes).flat().forEach((className) => elements.apiState.classList.remove(className));
    classes[type]?.forEach((className) => elements.apiState.classList.add(className));
  };

  const renderSuggestionSkeletons = () => {
    elements.suggestionsContent.innerHTML = Array.from({ length: 4 }, () => `<div class="flex animate-pulse items-center gap-3 p-3"><div class="h-16 w-11 rounded-lg bg-slate-200 dark:bg-slate-700"></div><div class="flex-1 space-y-2"><div class="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700"></div><div class="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700"></div></div></div>`).join("");
  };

  const openSuggestions = () => elements.suggestions.classList.remove("hidden");
  const closeSuggestions = () => elements.suggestions.classList.add("hidden");

  const renderApiSuggestions = (books, cached = false) => {
    elements.suggestionsStatus.textContent = cached ? "Saved catalog results" : `${books.length} Open Library suggestions`;
    if (!books.length) {
      elements.suggestionsContent.innerHTML = `<div class="p-5 text-center"><p class="font-extrabold">No catalog suggestion matched</p><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Try another title, author, or ISBN.</p></div>`;
      return;
    }
    elements.suggestionsContent.innerHTML = books.slice(0, 6).map((book, index) => {
      const cover = getApiCover(book, "S");
      const color = getGenreColor(getApiGenre(book));
      const coverPreview = cover
        ? `<div data-cover-shell class="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg" style="background:${color}"><div data-cover-fallback class="absolute inset-0 hidden" style="background:${color}"></div><img src="${cover}" data-api-cover-fallback alt="" class="h-full w-full object-cover"></div>`
        : `<span class="h-14 w-10 shrink-0 rounded-lg" style="background:${color}" aria-hidden="true"></span>`;
      return `<button type="button" class="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-500/15 dark:hover:bg-slate-800" data-api-suggestion-index="${index}">${coverPreview}<span class="min-w-0 flex-1"><span class="block truncate text-sm font-extrabold">${escapeHtml(book.title || "Untitled")}</span><span class="block truncate text-xs text-slate-500 dark:text-slate-400">${escapeHtml(getApiAuthor(book))} · ${book.first_publish_year || "Year unavailable"}</span></span><span class="shrink-0 rounded-full px-2 py-1 text-[10px] font-extrabold ${isAlreadyListed(book) ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300"}">${isAlreadyListed(book) ? "Available" : "Not listed"}</span></button>`;
    }).join("");
    elements.suggestionsContent.querySelectorAll("img[data-api-cover-fallback]").forEach(attachApiCoverFallback);
    elements.suggestionsContent.querySelectorAll("[data-api-suggestion-index]").forEach((button) => button.addEventListener("click", () => {
      const book = books[Number(button.dataset.apiSuggestionIndex)];
      if (!book) return;
      elements.searchInput.value = book.title || "";
      state.searchTerm = book.title || "";
      closeSuggestions();
      rememberSearch(state.searchTerm);
      renderMarketplace();
      elements.resultsAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  };

  const fetchOpenLibrary = async (query, options = {}) => {
    const requestId = ++state.apiRequestId;
    state.apiStatus = "loading";
    state.apiCached = false;
    renderMarketplace();
    if (options.showSuggestions !== false) {
      openSuggestions();
      renderSuggestionSkeletons();
      elements.suggestionsStatus.textContent = "Searching Open Library";
    }
    setApiState("loading", "Checking Open Library…");
    const endpoint = new URL("https://openlibrary.org/search.json");
    endpoint.searchParams.set("q", query);
    endpoint.searchParams.set("limit", "8");
    endpoint.searchParams.set("fields", "key,title,author_name,first_publish_year,cover_i,isbn,subject,publisher,language,number_of_pages_median,edition_count");
    try {
      if (!navigator.onLine) throw new Error("offline");
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Open Library returned ${response.status}`);
      const data = await response.json();
      if (requestId !== state.apiRequestId) return;
      state.apiResults = data.docs || [];
      state.apiStatus = "success";
      state.apiCached = false;
      writeApiCache(query, state.apiResults);
      if (options.showSuggestions !== false) renderApiSuggestions(state.apiResults, false);
      setApiState("success", "Open Library results loaded.");
      renderMarketplace();
    } catch {
      if (requestId !== state.apiRequestId) return;
      const cached = readApiCache()[normalize(query)];
      if (cached?.data) {
        state.apiResults = cached.data;
        state.apiStatus = "success";
        state.apiCached = true;
        if (options.showSuggestions !== false) renderApiSuggestions(state.apiResults, true);
        setApiState("cached", "Showing saved Open Library data.");
      } else {
        state.apiResults = [];
        state.apiStatus = "error";
        state.apiCached = false;
        if (options.showSuggestions !== false) elements.suggestionsContent.innerHTML = `<div class="p-5 text-center"><p class="font-extrabold">We could not load book information</p><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Check your connection and try again.</p><button type="button" id="api-retry" class="mt-4 rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white dark:bg-white dark:text-slate-950">Try again</button></div>`;
        elements.suggestionsContent.querySelector("#api-retry")?.addEventListener("click", () => fetchOpenLibrary(query));
        setApiState("error", "Open Library is unavailable. Local listings still work.");
      }
      renderMarketplace();
    }
  };

  const scheduleApiSearch = (query) => {
    clearTimeout(state.apiTimer);
    if (query.trim().length < 3) {
      state.apiResults = [];
      state.apiStatus = "idle";
      state.apiCached = false;
      closeSuggestions();
      setApiState("idle", "");
      renderMarketplace();
      return;
    }
    state.apiTimer = setTimeout(() => fetchOpenLibrary(query.trim()), 600);
  };

  const rememberSearch = (query) => {
    const cleaned = query.trim();
    if (!cleaned) return;
    const previous = readJson(storageKeys.recent, []);
    writeJson(storageKeys.recent, [cleaned, ...previous.filter((item) => normalize(item) !== normalize(cleaned))].slice(0, 6));
  };

  const resetFilters = () => {
    Object.assign(state, { searchTerm: "", modality: "All", genre: "All", author: "All", year: "All", condition: "All", sort: "Recommended", savedOnly: false, apiResults: [], apiStatus: "idle", apiCached: false });
    elements.searchInput.value = "";
    elements.genreFilter.value = "All";
    elements.authorFilter.value = "All";
    elements.yearFilter.value = "All";
    elements.conditionFilter.value = "All";
    elements.sortFilter.value = "Recommended";
    elements.modalityButtons[0]?.click();
    elements.savedButton.setAttribute("aria-pressed", "false");
    elements.savedButton.classList.remove("border-rose-300", "text-rose-600", "dark:border-rose-800", "dark:text-rose-300");
    setApiState("idle", "");
    closeSuggestions();
    renderMarketplace();
  };

  const initializeQuery = async () => {
    const query = new URLSearchParams(window.location.search).get("q")?.trim() || "";
    if (!query) return;
    elements.searchInput.value = query;
    state.searchTerm = query;
    await fetchOpenLibrary(query, { showSuggestions: false });
    rememberSearch(query);
    requestAnimationFrame(() => elements.resultsAnchor.scrollIntoView({ block: "start" }));
  };

  elements.searchInput.addEventListener("input", () => {
    const value = elements.searchInput.value;
    state.searchTerm = value;
    elements.searchInput.setAttribute("aria-invalid", "false");
    elements.searchError.classList.add("hidden");
    renderMarketplace();
    scheduleApiSearch(value);
  });

  elements.searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateSearch()) {
      elements.searchInput.focus();
      return;
    }
    const query = elements.searchInput.value.trim();
    state.searchTerm = query;
    rememberSearch(query);
    await fetchOpenLibrary(query, { showSuggestions: false });
    elements.resultsAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      elements.searchInput.focus();
      elements.searchInput.select();
    }
    if (event.key === "Escape") {
      closeSuggestions();
      if (elements.cartDrawer.getAttribute("aria-hidden") === "false") closeCart();
      else closeQuickView();
    }
  });

  document.addEventListener("click", (event) => {
    if (!elements.searchForm.contains(event.target) && !elements.suggestions.contains(event.target)) closeSuggestions();
  });

  elements.quickViewClose.addEventListener("click", closeQuickView);
  elements.quickViewBackdrop.addEventListener("click", closeQuickView);
  elements.cartToggle.addEventListener("click", openCart);
  elements.cartClose.addEventListener("click", closeCart);
  elements.cartBackdrop.addEventListener("click", closeCart);
  elements.clearFilters.addEventListener("click", resetFilters);
  elements.clearFiltersInline.addEventListener("click", resetFilters);
  elements.advancedFiltersToggle.addEventListener("click", () => {
    const hidden = elements.advancedFilters.classList.toggle("hidden");
    elements.advancedFilters.classList.toggle("grid", !hidden);
    elements.advancedFiltersToggle.setAttribute("aria-expanded", String(!hidden));
  });

  window.addEventListener("thebridge:network-change", ({ detail }) => {
    if (!detail.online && state.searchTerm.trim().length >= 3) setApiState("cached", "Offline. Search will use saved Open Library data when available.");
  });

  setupFilters();
  renderMarketplace();
  renderCart();
  initializeQuery();
  if (window.location.hash === "#cart") requestAnimationFrame(openCart);
})();
