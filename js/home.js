(() => {
  const listings = Array.isArray(window.TheBridgeData) ? window.TheBridgeData : [];
  const searchForm = document.querySelector("#home-search-form");
  const searchInput = document.querySelector("#home-search");
  const searchError = document.querySelector("#home-search-error");
  const featuredGrid = document.querySelector("#home-featured-grid");
  const stats = document.querySelector("#home-stats");
  const recentSearches = document.querySelector("#recent-searches");

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
    Default: "#64748B"
  };

  const readJson = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  };

  const getGenreColor = (genre) => genreColors[genre] || genreColors.Default;

  const goToMarketplace = (query = "") => {
    const url = new URL("marketplace.html", window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    window.location.href = url.href;
  };

  const coverMarkup = (listing) => {
    const src = listing.cover || "";
    const color = getGenreColor(listing.genre);
    return `<div data-home-cover-shell class="relative aspect-[2/3] w-full overflow-hidden rounded-2xl shadow-sm" style="background:${color}"><div data-home-cover-fallback class="${src ? "hidden " : ""}absolute inset-0" style="background:${color}"></div>${src ? `<img src="${src}" alt="Cover of ${listing.title} by ${listing.author}" class="h-full w-full object-cover" loading="lazy">` : ""}</div>`;
  };

  const renderFeatured = () => {
    const featured = [...listings]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    featuredGrid.innerHTML = featured.map((listing) => `
      <a href="marketplace.html?q=${encodeURIComponent(listing.title)}" class="group min-w-0 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
        ${coverMarkup(listing)}
        <h3 class="mt-3 truncate text-sm font-black text-slate-950 dark:text-white">${listing.title}</h3>
        <p class="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">${listing.author}</p>
        <span class="mt-3 inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-extrabold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">${listing.modality}</span>
      </a>
    `).join("");

    featuredGrid.querySelectorAll("[data-home-cover-shell] img").forEach((image) => {
      image.addEventListener("error", () => {
        image.classList.add("hidden");
        image.closest("[data-home-cover-shell]")?.querySelector("[data-home-cover-fallback]")?.classList.remove("hidden");
      }, { once: true });
    });
  };

  const renderStats = () => {
    const summary = listings.reduce((accumulator, listing) => {
      accumulator.total += 1;
      accumulator.modalities.add(listing.modality);
      if (listing.modality === "Exchange") accumulator.exchange += 1;
      if (listing.status === "Available") accumulator.available += 1;
      return accumulator;
    }, { total: 0, exchange: 0, available: 0, modalities: new Set() });

    const rows = [
      [summary.total, "Community listings"],
      [summary.modalities.size, "Sharing modes"],
      [summary.exchange, "Exchange options"],
      [summary.available, "Available now"]
    ];

    stats.innerHTML = rows.map(([value, label]) => `<div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"><dt class="text-2xl font-black">${value}</dt><dd class="mt-1 text-xs font-bold text-indigo-100">${label}</dd></div>`).join("");
  };

  const renderRecentSearches = () => {
    const searches = readJson("thebridge:recent-searches", []).slice(0, 4);
    if (!searches.length) {
      recentSearches.innerHTML = `<span class="text-xs font-semibold text-slate-300">Try “Dune”, “Fantasy”, or an ISBN.</span>`;
      return;
    }

    recentSearches.innerHTML = searches.map((query) => `<button type="button" data-recent-query="${query.replace(/"/g, "&quot;")}" class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-100 backdrop-blur transition hover:bg-white/15">↻ ${query}</button>`).join("");
    recentSearches.querySelectorAll("[data-recent-query]").forEach((button) => {
      button.addEventListener("click", () => goToMarketplace(button.dataset.recentQuery));
    });
  };

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    const valid = query.length >= 2;
    searchInput.setAttribute("aria-invalid", String(!valid));
    searchError.classList.toggle("hidden", valid);
    if (!valid) {
      searchInput.focus();
      return;
    }
    goToMarketplace(query);
  });

  searchInput?.addEventListener("input", () => {
    searchError.classList.add("hidden");
    searchInput.setAttribute("aria-invalid", "false");
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchInput?.focus();
      searchInput?.select();
    }
  });

  renderFeatured();
  renderStats();
  renderRecentSearches();
})();
