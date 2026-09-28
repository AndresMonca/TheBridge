(() => {
  const CATALOG = Array.isArray(window.TheBridgeData) ? window.TheBridgeData : [];

  const EXTRA_BOOKS = [
    {
      id: "extra-01",
      title: "The Hunger Games",
      author: "Suzanne Collins",
      cover: "https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg?default=false",
      genre: "Science Fiction",
      year: 2008,
      isbn: "9780439023481"
    },
    {
      id: "extra-02",
      title: "Gone Girl",
      author: "Gillian Flynn",
      cover: "https://covers.openlibrary.org/b/isbn/9780307588364-L.jpg?default=false",
      genre: "Thriller",
      year: 2012,
      isbn: "9780307588364"
    },
    {
      id: "extra-03",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      cover: "https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg?default=false",
      genre: "Fantasy",
      year: 1954,
      isbn: "9780544003415"
    },
    {
      id: "extra-04",
      title: "Don Quixote",
      author: "Miguel de Cervantes",
      cover: "https://covers.openlibrary.org/b/isbn/9780060934347-L.jpg?default=false",
      genre: "Classic",
      year: 1605,
      isbn: "9780060934347"
    },
    {
      id: "extra-05",
      title: "The Song of Ice and Fire",
      author: "George R.R. Martin",
      cover: "https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg?default=false",
      genre: "Fantasy",
      year: 1996,
      isbn: "9780553103540"
    }
  ];

  const FULL_CATALOG = [...CATALOG, ...EXTRA_BOOKS];

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
    Thriller: "#B91C1C",
    Default: "#64748B"
  };

  const elements = {
    form: document.querySelector("#add-book-form"),
    searchInput: document.querySelector("#book-search"),
    searchHint: document.querySelector("#search-hint"),
    searchError: document.querySelector("#search-validation-error"),
    stateIdle: document.querySelector("#state-idle"),
    stateLoading: document.querySelector("#state-loading"),
    stateResults: document.querySelector("#state-results"),
    stateNoResults: document.querySelector("#state-no-results"),
    stateError: document.querySelector("#state-error"),
    resultsLabel: document.querySelector("#results-label"),
    resultsGrid: document.querySelector("#results-grid"),
    noResultsText: document.querySelector("#no-results-text"),
    clearSearchBtn: document.querySelector("#clear-search-btn"),
    retrySearchBtn: document.querySelector("#retry-search-btn"),
    searchPhase: document.querySelector("#search-phase"),
    confirmPhase: document.querySelector("#confirm-phase"),
    successPhase: document.querySelector("#success-phase"),
    selectedPreview: document.querySelector("#selected-book-preview"),
    confirmForm: document.querySelector("#confirm-form"),
    conditionError: document.querySelector("#condition-error"),
    bookNotes: document.querySelector("#book-notes"),
    notesCount: document.querySelector("#notes-count"),
    backToSearch: document.querySelector("#back-to-search"),
    successBookName: document.querySelector("#success-book-name"),
    addAnotherBtn: document.querySelector("#add-another-btn"),
    successLiveRegion: document.querySelector("#success-live-region")
  };

  const state = {
    phase: "idle",
    lastQuery: "",
    searchResults: [],
    selectedBook: null,
    searchTimer: null
  };

  const normalize = (value) =>
    String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const getGenreColor = (genre) => genreColors[genre] || genreColors.Default;

  const hideAllSearchStates = () => {
    [elements.stateIdle, elements.stateLoading, elements.stateResults, elements.stateNoResults, elements.stateError]
      .forEach((el) => el?.classList.add("hidden"));
  };

  const showSearchState = (stateName) => {
    hideAllSearchStates();
    const panelMap = {
      idle: elements.stateIdle,
      loading: elements.stateLoading,
      results: elements.stateResults,
      "no-results": elements.stateNoResults,
      error: elements.stateError
    };
    panelMap[stateName]?.classList.remove("hidden");
    state.phase = stateName;
  };

  const searchCatalog = (query) => {
    const term = normalize(query);
    if (!term) return [];
    return FULL_CATALOG.filter((book) => {
      const searchable = normalize(`${book.title} ${book.author} ${book.isbn || ""}`);
      return searchable.includes(term);
    });
  };

  const coverShell = (book) => {
    const color = getGenreColor(book.genre || "Default");
    const src = book.cover || "";
    return `<div class="relative h-full w-full overflow-hidden" style="background:${color}">
      <div class="${src ? "hidden " : ""}absolute inset-0" style="background:${color}" data-cover-fallback></div>
      ${src ? `<img src="${escapeHtml(src)}" alt="Cover of ${escapeHtml(book.title)}" data-result-cover class="h-full w-full object-cover">` : ""}
    </div>`;
  };

  const createResultCard = (book, index) =>
    `<article class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div class="relative aspect-[2/3] overflow-hidden">${coverShell(book)}</div>
      <div class="space-y-3 p-4">
        <div class="min-w-0">
          <h3 class="line-clamp-2 text-sm font-extrabold tracking-tight text-slate-950 dark:text-white">${escapeHtml(book.title)}</h3>
          <p class="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">${escapeHtml(book.author)}</p>
          ${book.year ? `<p class="mt-1 text-xs font-semibold text-slate-400 dark:text-slate-500">📅 ${book.year}</p>` : ""}
        </div>
        <button type="button" data-select-index="${index}" class="w-full rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-50" aria-label="Select ${escapeHtml(book.title)} by ${escapeHtml(book.author)}">Select this book</button>
      </div>
    </article>`;

  const renderResults = (results) => {
    elements.resultsLabel.textContent = `${results.length} ${results.length === 1 ? "book" : "books"} found for "${state.lastQuery}"`;
    elements.resultsGrid.innerHTML = results.map((book, i) => createResultCard(book, i)).join("");

    elements.resultsGrid.querySelectorAll("img[data-result-cover]").forEach((img) => {
      img.addEventListener("error", () => {
        img.classList.add("hidden");
        img.closest("[data-cover-fallback]")?.classList.remove("hidden");
        const shell = img.parentElement;
        shell?.querySelector("[data-cover-fallback]")?.classList.remove("hidden");
      }, { once: true });
    });

    elements.resultsGrid.querySelectorAll("[data-select-index]").forEach((btn) => {
      btn.addEventListener("click", () => handleBookSelect(Number(btn.dataset.selectIndex)));
    });
  };

  const performSearch = (query) => {
    clearTimeout(state.searchTimer);
    state.lastQuery = query;
    showSearchState("loading");

    state.searchTimer = setTimeout(() => {
      if (normalize(query) === "error") {
        showSearchState("error");
        return;
      }

      const results = searchCatalog(query);
      state.searchResults = results;

      if (results.length === 0) {
        elements.noResultsText.textContent = `No books found for "${query}". Try a different title, author, or ISBN.`;
        showSearchState("no-results");
      } else {
        showSearchState("results");
        renderResults(results);
      }
    }, 850);
  };

  const handleBookSelect = (index) => {
    const book = state.searchResults[index];
    if (!book) return;

    state.selectedBook = book;
    state.phase = "confirm";

    const color = getGenreColor(book.genre || "Default");
    elements.selectedPreview.innerHTML = `
      <div class="h-20 w-14 shrink-0 overflow-hidden rounded-xl" style="background:${color}">
        ${book.cover ? `<img src="${escapeHtml(book.cover)}" alt="Cover of ${escapeHtml(book.title)}" class="h-full w-full object-cover">` : ""}
      </div>
      <div class="min-w-0">
        <p class="text-xs font-extrabold uppercase tracking-[0.12em] text-indigo-600 dark:text-indigo-400">Selected book</p>
        <h3 class="mt-1 line-clamp-2 text-base font-black text-slate-950 dark:text-white">${escapeHtml(book.title)}</h3>
        <p class="truncate text-sm text-slate-500 dark:text-slate-400">${escapeHtml(book.author)}</p>
        ${book.year ? `<p class="mt-1 text-xs font-semibold text-indigo-500 dark:text-indigo-400">📅 ${book.year}</p>` : ""}
      </div>
    `;

    elements.searchPhase.classList.add("hidden");
    elements.confirmPhase.classList.remove("hidden");
    elements.successPhase.classList.add("hidden");

    resetConditionError();

    elements.backToSearch?.focus();
  };

  const resetConditionError = () => {
    elements.conditionError.classList.add("hidden");
    document.querySelectorAll("input[name='condition']").forEach((radio) => {
      radio.setAttribute("aria-invalid", "false");
    });
  };

  const handleConfirmSubmit = (event) => {
    event.preventDefault();

    const conditionRadios = document.querySelectorAll("input[name='condition']");
    const selected = [...conditionRadios].find((r) => r.checked);

    if (!selected) {
      conditionRadios.forEach((r) => r.setAttribute("aria-invalid", "true"));
      elements.conditionError.classList.remove("hidden");
      elements.conditionError.focus();
      return;
    }

    resetConditionError();

    const newBook = {
      id: `added-${Date.now()}`,
      title: state.selectedBook.title,
      author: state.selectedBook.author,
      cover: state.selectedBook.cover || "",
      genre: state.selectedBook.genre || "Default",
      condition: selected.value,
      status: "Available",
      notes: elements.bookNotes.value.trim(),
      addedAt: new Date().toISOString().split("T")[0]
    };

    try {
      const existing = JSON.parse(localStorage.getItem("thebridge:my-books") || "[]");
      existing.push(newBook);
      localStorage.setItem("thebridge:my-books", JSON.stringify(existing));
    } catch (storageError) {
      console.warn("The book could not be saved to localStorage.", storageError);
    }

    elements.successLiveRegion.textContent = `"${newBook.title}" has been added to your library successfully.`;

    state.phase = "success";
    elements.confirmPhase.classList.add("hidden");
    elements.successPhase.classList.remove("hidden");
    elements.successBookName.textContent = `"${newBook.title}" by ${newBook.author} is now in your library as Available.`;

    window.dispatchEvent(new CustomEvent("thebridge:book-added", { detail: newBook }));
  };

  const resetToIdle = () => {
    state.phase = "idle";
    state.selectedBook = null;
    state.searchResults = [];
    state.lastQuery = "";

    elements.searchPhase.classList.remove("hidden");
    elements.confirmPhase.classList.add("hidden");
    elements.successPhase.classList.add("hidden");

    elements.confirmForm.reset();
    elements.notesCount.textContent = "0";
    resetConditionError();

    elements.searchInput.value = "";
    elements.searchInput.setAttribute("aria-invalid", "false");
    elements.searchError.classList.add("hidden");
    showSearchState("idle");
    elements.searchInput.focus();
  };

  elements.form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = elements.searchInput.value.trim();

    if (query.length < 2) {
      elements.searchInput.setAttribute("aria-invalid", "true");
      elements.searchError.textContent = "Enter at least 2 characters to search.";
      elements.searchError.classList.remove("hidden");
      elements.searchInput.focus();
      return;
    }

    elements.searchInput.setAttribute("aria-invalid", "false");
    elements.searchError.classList.add("hidden");
    performSearch(query);
  });

  elements.searchInput?.addEventListener("input", () => {
    elements.searchInput.setAttribute("aria-invalid", "false");
    elements.searchError.classList.add("hidden");
  });

  elements.clearSearchBtn?.addEventListener("click", resetToIdle);

  elements.retrySearchBtn?.addEventListener("click", () => {
    showSearchState("idle");
    elements.searchInput.focus();
  });

  elements.backToSearch?.addEventListener("click", () => {
    state.phase = "results";
    elements.searchPhase.classList.remove("hidden");
    elements.confirmPhase.classList.add("hidden");

    if (state.searchResults.length > 0) {
      showSearchState("results");
      renderResults(state.searchResults);
    } else {
      showSearchState("idle");
    }
  });

  elements.confirmForm?.addEventListener("submit", handleConfirmSubmit);

  elements.addAnotherBtn?.addEventListener("click", resetToIdle);

  elements.bookNotes?.addEventListener("input", () => {
    elements.notesCount.textContent = String(elements.bookNotes.value.length);
  });

  document.querySelectorAll("input[name='condition']").forEach((radio) => {
    radio.addEventListener("change", () => {
      resetConditionError();
    });
  });

  showSearchState("idle");
})();
