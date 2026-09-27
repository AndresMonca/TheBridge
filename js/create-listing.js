(() => {
  const SEED_BOOKS = [
    {
      id: "mybook-01",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      cover: "https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg?default=false",
      genre: "Fantasy",
      condition: "Good condition",
      status: "Available"
    },
    {
      id: "mybook-04",
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      cover: "https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg?default=false",
      genre: "Fantasy",
      condition: "Like new",
      status: "Available"
    }
  ];

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

  const modalityMessages = {
    Exchange: "Exchange selected. Add the book you would like in return — this is optional.",
    Loan: "Loan selected. Choose how long the borrower can keep the book.",
    Rental: "Rental selected. Set a price and how long the book is rented.",
    Sale: "Sale selected. Set the price for the book."
  };
  const idleMessage = "Select an option to see the details it needs.";

  const requirePrice = (value) => {
    const price = Number(value);
    return value.trim() !== "" && Number.isFinite(price) && price > 0 ? "" : "Enter a price greater than 0.";
  };
  const requireDuration = (value) => (value ? "" : "Select a duration.");
  const rules = {
    Exchange: {},
    Loan: { loanDuration: requireDuration },
    Rental: { rentalPrice: requirePrice, rentalDuration: requireDuration },
    Sale: { salePrice: requirePrice }
  };
  const fieldLabels = {
    loanDuration: "Loan duration",
    rentalPrice: "Rental price",
    rentalDuration: "Rental duration",
    salePrice: "Sale price"
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-CO", { style: "currency", currency: "COP", currencyDisplay: "code", maximumFractionDigits: 0 }).format(Number(value));

  const form = document.querySelector("#listing-form");
  const panels = form.querySelectorAll("[data-panel]");
  const messageEl = document.querySelector("#modality-message");
  const liveEl = document.querySelector("#form-live");
  const successPanel = document.querySelector("#success-panel");

  const state = {
    book: null,
    modality: null,
    values: { desiredBook: "", loanDuration: "", rentalPrice: "", rentalDuration: "", salePrice: "" }
  };

  const loadAvailableBooks = () => {
    let stored = [];
    try {
      const parsed = JSON.parse(localStorage.getItem("thebridge:my-books") || "[]");
      if (Array.isArray(parsed)) stored = parsed;
    } catch {
      stored = [];
    }
    return [...SEED_BOOKS, ...stored].filter(
      (book) => book && typeof book.id === "string" && typeof book.title === "string" && book.status === "Available"
    );
  };

  const resolveBook = () => {
    const available = loadAvailableBooks();
    const requestedId = new URLSearchParams(window.location.search).get("book");
    const match = requestedId ? available.find((book) => book.id === requestedId) : null;
    if (match) return { book: match, notice: null };

    return {
      book: available[0],
      notice: requestedId
        ? {
            title: "We couldn't find that book",
            text: "It doesn't exist or is not available to list right now, so we selected one of your available books instead."
          }
        : {
            title: "No book selected",
            text: "Open this page from My Books to pick a specific book. For now we selected one of your available books."
          }
    };
  };

  const renderBook = (book) => {
    const cover = document.querySelector("#book-cover");
    const fallback = document.querySelector("#book-cover-fallback");
    const color = genreColors[book.genre] || genreColors.Default;

    document.querySelector("#book-title").textContent = book.title;
    document.querySelector("#book-author").textContent = book.author || "Unknown author";
    document.querySelector("#book-condition").textContent = `📚 ${book.condition || "Condition not set"}`;

    fallback.style.background = color;
    if (book.cover) {
      cover.src = book.cover;
      cover.alt = `Cover of ${book.title} by ${book.author || "unknown author"}`;
      cover.addEventListener("error", () => {
        cover.classList.add("hidden");
        fallback.classList.remove("hidden");
      }, { once: true });
    } else {
      cover.classList.add("hidden");
      fallback.classList.remove("hidden");
    }
  };

  const renderModality = () => {
    const active = state.modality || "none";
    panels.forEach((panel) => {
      const visible = panel.dataset.panel === active;
      panel.classList.toggle("hidden", !visible);
      panel.querySelectorAll("input, select").forEach((field) => { field.disabled = !visible; });
    });
    messageEl.textContent = modalityMessages[state.modality] || idleMessage;
  };

  const syncStateFromForm = () => {
    state.modality = form.querySelector("input[name='modality']:checked")?.value || null;
    Object.keys(state.values).forEach((name) => {
      const field = form.elements[name];
      if (field) state.values[name] = field.value;
    });
  };

  const announce = (message) => {
    liveEl.textContent = "";
    setTimeout(() => { liveEl.textContent = message; }, 50);
  };

  const setFieldError = (name, message) => {
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    const field = form.elements[name];
    errorEl.textContent = message;
    errorEl.classList.toggle("hidden", !message);
    if (field instanceof Element) {
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
  };

  const clearErrors = () => {
    form.querySelectorAll("[data-error-for]").forEach((el) => setFieldError(el.dataset.errorFor, ""));
  };

  const validate = () => {
    const invalid = [];
    Object.entries(rules[state.modality]).forEach(([name, rule]) => {
      const message = rule(state.values[name]);
      setFieldError(name, message);
      if (message) invalid.push(name);
    });
    return invalid;
  };

  form.addEventListener("change", (event) => {
    if (event.target.name === "modality") {
      state.modality = event.target.value;
      clearErrors();
      renderModality();
    }
  });

  form.addEventListener("input", (event) => {
    const { name } = event.target;
    if (!(name in state.values)) return;
    state.values[name] = event.target.value;
    if (event.target.getAttribute("aria-invalid") === "true") setFieldError(name, rules[state.modality][name](event.target.value));
  });

  const addRow = (list, label, value) => {
    const row = document.createElement("div");
    row.className = "flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6";
    const dt = document.createElement("dt");
    dt.className = "text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400";
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.className = "text-sm font-extrabold text-slate-950 sm:text-right dark:text-white";
    dd.textContent = value;
    row.append(dt, dd);
    list.append(row);
  };

  const showSuccess = () => {
    const details = document.querySelector("#success-details");
    const { modality, values, book } = state;
    details.replaceChildren();
    addRow(details, "Book", `${book.title} — ${book.author || "Unknown author"}`);
    addRow(details, "Modality", modality);
    if (modality === "Exchange") addRow(details, "Desired book", values.desiredBook.trim() || "Open to offers");
    if (modality === "Loan") addRow(details, "Duration", values.loanDuration);
    if (modality === "Rental") {
      addRow(details, "Price", formatPrice(values.rentalPrice));
      addRow(details, "Duration", values.rentalDuration);
    }
    if (modality === "Sale") addRow(details, "Price", formatPrice(values.salePrice));

    const status = document.querySelector("#book-status");
    status.textContent = "📢 Published";
    status.className = "rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-extrabold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300";

    form.classList.add("hidden");
    successPanel.classList.remove("hidden");
    document.querySelector("#success-heading").focus();
    announce(`Listing published! ${book.title} is now listed as ${modality}.`);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!state.modality) {
      const message = "Choose how you want to share this book.";
      setFieldError("modality", message);
      form.querySelector("input[name='modality']").focus();
      announce(message);
      return;
    }

    const invalid = validate();
    if (invalid.length) {
      form.elements[invalid[0]].focus();
      announce(`Please fix ${invalid.length === 1 ? "1 field" : `${invalid.length} fields`}: ${invalid.map((name) => fieldLabels[name]).join(", ")}.`);
      return;
    }
    showSuccess();
  });

  const { book, notice } = resolveBook();
  state.book = book;
  renderBook(book);

  if (notice) {
    document.querySelector("#book-notice-title").textContent = notice.title;
    document.querySelector("#book-notice-text").textContent = notice.text;
    document.querySelector("#book-notice").classList.remove("hidden");
  }

  syncStateFromForm();
  renderModality();
})();
