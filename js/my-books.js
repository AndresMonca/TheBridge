(() => {
  // Libros base del usuario simulado - cubren los tres estados requeridos: Available, Published y Loaned
  const MOCK_BASE_BOOKS = [
    {
      id: "mybook-01",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      cover: "https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg?default=false",
      genre: "Fantasy",
      condition: "Good condition",
      status: "Available",
      notes: "",
      addedAt: "2026-09-26"
    },
    {
      id: "mybook-02",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg?default=false",
      genre: "History",
      condition: "Good condition",
      status: "Published",
      listingModality: "Sale",
      notes: "A few highlighted passages, otherwise in excellent shape.",
      addedAt: "2026-09-21"
    },
    {
      id: "mybook-03",
      title: "Brave New World",
      author: "Aldous Huxley",
      cover: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg?default=false",
      genre: "Dystopian",
      condition: "Like new",
      status: "Loaned",
      loanedTo: "Sara J.",
      notes: "",
      addedAt: "2026-09-11"
    },
    {
      id: "mybook-04",
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      cover: "https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg?default=false",
      genre: "Fantasy",
      condition: "Like new",
      status: "Available",
      notes: "",
      addedAt: "2026-09-15"
    }
  ];

  // Mapeo de colores por género para el fondo del cover cuando la imagen falla
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

  // Configuración visual de badges para cada estado
  const statusConfig = {
    Available: {
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
      label: "✅ Available"
    },
    Published: {
      badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
      label: "📢 Published"
    },
    Loaned: {
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      label: "🤝 Loaned"
    }
  };

  // Estilos del texto de modalidad para el estado Published
  const modalityTextStyles = {
    Exchange: "text-violet-600 dark:text-violet-300",
    Loan: "text-emerald-600 dark:text-emerald-300",
    Rental: "text-amber-700 dark:text-amber-300",
    Sale: "text-rose-600 dark:text-rose-300"
  };

  const elements = {
    grid: document.querySelector("#my-books-grid"),
    empty: document.querySelector("#my-books-empty"),
    emptyHeading: document.querySelector("#empty-heading"),
    emptyDescription: document.querySelector("#empty-description"),
    emptyCta: document.querySelector("#empty-cta"),
    liveRegion: document.querySelector("#my-books-live"),
    tabs: document.querySelectorAll("[data-tab]"),
    countAll: document.querySelector("#count-all"),
    countAvailable: document.querySelector("#count-available"),
    countPublished: document.querySelector("#count-published"),
    countLoaned: document.querySelector("#count-loaned")
  };

  const state = { filter: "All" };

  const getGenreColor = (genre) => genreColors[genre] || genreColors.Default;

  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Lee libros añadidos manualmente desde localStorage y los combina con los base
  const loadAllBooks = () => {
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem("thebridge:my-books") || "[]");
      if (!Array.isArray(stored)) stored = [];
    } catch {
      stored = [];
    }
    // Los libros del localStorage se añaden al final para preservar el orden natural
    return [...MOCK_BASE_BOOKS, ...stored];
  };

  // Construye el shell de portada con fallback de color si la imagen no carga
  const coverShell = (book) => {
    const color = getGenreColor(book.genre);
    const src = book.cover || "";
    return `<div data-cover-shell class="relative h-full w-full overflow-hidden" style="background:${color}">
      <div data-cover-fallback class="${src ? "hidden " : ""}absolute inset-0" style="background:${color}"></div>
      ${src ? `<img src="${escapeHtml(src)}" alt="Cover of ${escapeHtml(book.title)} by ${escapeHtml(book.author)}" data-book-cover-id="${escapeHtml(book.id)}" class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]">` : ""}
    </div>`;
  };

  // Genera el pie de cada tarjeta según el estado del libro
  const cardFooter = (book) => {
    if (book.status === "Available") {
      // Libros disponibles pueden publicarse como listing - se pasa el id para pre-cargar el libro
      return `<a href="create-listing.html?book=${encodeURIComponent(book.id)}" class="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-50">Create Listing <span aria-hidden="true">→</span></a>`;
    }
    if (book.status === "Published") {
      const modalityClass = modalityTextStyles[book.listingModality] || "text-indigo-600";
      return `<div class="flex flex-col gap-2">
        <p class="text-xs font-extrabold ${modalityClass}">Listed as ${escapeHtml(book.listingModality || "listing")}</p>
        <a href="marketplace.html" class="w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-center text-sm font-extrabold text-indigo-700 transition hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-indigo-300">View in Marketplace →</a>
      </div>`;
    }
    if (book.status === "Loaned") {
      return `<div class="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 dark:border-amber-800/60 dark:bg-amber-950/30">
        <p class="text-xs font-extrabold text-amber-800 dark:text-amber-300">Loaned to</p>
        <p class="mt-0.5 text-sm font-black text-amber-900 dark:text-amber-200">${escapeHtml(book.loanedTo || "—")}</p>
      </div>`;
    }
    return "";
  };

  // Markup completo de una tarjeta de libro con portada, estado y acciones
  const createCardMarkup = (book) => {
    const statusCfg = statusConfig[book.status] || statusConfig.Available;
    return `<article class="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/70">
      <div class="relative aspect-[2/3] overflow-hidden">
        ${coverShell(book)}
        <span class="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-sm ${statusCfg.badge}">${statusCfg.label}</span>
      </div>
      <div class="space-y-3 p-4">
        <div class="min-w-0">
          <h2 class="truncate text-base font-extrabold tracking-tight text-slate-950 dark:text-white">${escapeHtml(book.title)}</h2>
          <p class="truncate text-sm text-slate-500 dark:text-slate-400">${escapeHtml(book.author)}</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">📚 ${escapeHtml(book.condition)}</span>
        </div>
        <div class="border-t border-slate-100 pt-3 dark:border-slate-800">
          ${cardFooter(book)}
        </div>
      </div>
    </article>`;
  };

  // Actualiza los contadores en cada tab según los libros actuales
  const updateTabCounts = (allBooks) => {
    const counts = allBooks.reduce((acc, book) => {
      acc[book.status] = (acc[book.status] || 0) + 1;
      return acc;
    }, {});
    elements.countAll.textContent = String(allBooks.length);
    elements.countAvailable.textContent = String(counts.Available || 0);
    elements.countPublished.textContent = String(counts.Published || 0);
    elements.countLoaned.textContent = String(counts.Loaned || 0);
  };

  // Reaplica los estilos de los tabs según cuál está activo
  const updateTabStyles = () => {
    elements.tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === state.filter;
      tab.setAttribute("aria-selected", String(isActive));
      if (isActive) {
        tab.className = "rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950";
      } else {
        tab.className = "rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:ring-indigo-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700";
      }
    });
  };

  // Muestra el estado vacío con el mensaje adecuado según el contexto
  const showEmptyState = (filter, hasAnyBooks) => {
    elements.empty.classList.remove("hidden");
    elements.grid.innerHTML = "";

    if (!hasAnyBooks) {
      // La biblioteca está completamente vacía - se invita a añadir el primer libro
      elements.emptyHeading.textContent = "No books in your library yet";
      elements.emptyDescription.textContent = "Start by adding the books you own. Once added, you can create a listing to share them with the community.";
      elements.emptyCta.classList.remove("hidden");
    } else {
      // Hay libros pero ninguno coincide con el filtro activo
      const messages = {
        Available: ["No available books", "Books you have already listed or loaned out will not appear here."],
        Published: ["Nothing published yet", "When you create a listing from an available book, it will appear here."],
        Loaned: ["No books currently loaned", "Books you loan to other students will be tracked here."]
      };
      const [heading, desc] = messages[filter] || ["No books found", "Try a different filter."];
      elements.emptyHeading.textContent = heading;
      elements.emptyDescription.textContent = desc;
      elements.emptyCta.classList.add("hidden");
    }
  };

  const renderBooks = () => {
    const allBooks = loadAllBooks();
    updateTabCounts(allBooks);

    const filtered = state.filter === "All" ? allBooks : allBooks.filter((b) => b.status === state.filter);

    if (filtered.length === 0) {
      showEmptyState(state.filter, allBooks.length > 0);
      const label = state.filter === "All" ? "" : `${state.filter.toLowerCase()} `;
      elements.liveRegion.textContent = `No ${label}books in your library.`;
      return;
    }

    elements.empty.classList.add("hidden");
    elements.grid.innerHTML = filtered.map(createCardMarkup).join("");

    const label = state.filter === "All" ? "" : `${state.filter.toLowerCase()} `;
    elements.liveRegion.textContent = `${filtered.length} ${label}${filtered.length === 1 ? "book" : "books"} shown.`;

    // Fallback de portadas que no cargan: muestra el fondo de color en su lugar
    elements.grid.querySelectorAll("img[data-book-cover-id]").forEach((img) => {
      img.addEventListener("error", () => {
        img.classList.add("hidden");
        img.closest("[data-cover-shell]")?.querySelector("[data-cover-fallback]")?.classList.remove("hidden");
      }, { once: true });
    });
  };

  // Listener para cambiar el filtro al hacer clic en un tab
  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.filter = tab.dataset.tab;
      updateTabStyles();
      renderBooks();
    });
  });

  // Refresca la vista cuando add-book.js dispara el evento de libro añadido
  window.addEventListener("thebridge:book-added", renderBooks);

  renderBooks();
})();
