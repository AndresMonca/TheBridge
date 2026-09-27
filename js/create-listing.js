(() => {
  // Capa de compatibilidad: js/my-books.js define sus libros base de forma privada (IIFE) y no se puede
  // importar ni modificar. Se replican aquí solo los libros semilla con estado Available que enlazan a esta página.
  // Si cambian en my-books.js, hay que actualizarlos también aquí.
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

  // Mismos colores de género que My Books para el fondo de la portada cuando la imagen falla
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

  // Mensaje que se anuncia en la región aria-live al elegir cada modalidad
  const modalityMessages = {
    Exchange: "Exchange selected. Add the book you would like in return — this is optional.",
    Loan: "Loan selected. Choose how long the borrower can keep the book.",
    Rental: "Rental selected. Set a price and how long the book is rented.",
    Sale: "Sale selected. Set the price for the book."
  };
  const idleMessage = "Select an option to see the details it needs.";

  const form = document.querySelector("#listing-form");
  const panels = form.querySelectorAll("[data-panel]");
  const messageEl = document.querySelector("#modality-message");

  // Estado local de la página. La siguiente tarea (validación y envío) lee de aquí.
  // Los valores de cada campo se conservan al cambiar de modalidad para no perder lo que el usuario escribió.
  const state = {
    book: null,
    modality: null,
    values: { desiredBook: "", loanDuration: "", rentalPrice: "", rentalDuration: "", salePrice: "" }
  };

  // Combina los libros semilla con los de localStorage y deja solo los Available.
  // localStorage puede estar vacío, corrupto o bloqueado, así que cualquier fallo cae a solo los semilla.
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

  // Resuelve el libro pedido en ?book=. Si falta o no está disponible se usa el primero disponible
  // y se devuelve la razón para mostrar un aviso claro en la interfaz.
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
      // Si la portada no carga se muestra el color del género en su lugar
      cover.addEventListener("error", () => {
        cover.classList.add("hidden");
        fallback.classList.remove("hidden");
      }, { once: true });
    } else {
      cover.classList.add("hidden");
      fallback.classList.remove("hidden");
    }
  };

  // Muestra solo el panel de la modalidad activa. Los campos ocultos se deshabilitan para que no reciban
  // foco ni se envíen con el formulario.
  const renderModality = () => {
    const active = state.modality || "none";
    panels.forEach((panel) => {
      const visible = panel.dataset.panel === active;
      panel.classList.toggle("hidden", !visible);
      panel.querySelectorAll("input, select").forEach((field) => { field.disabled = !visible; });
    });
    messageEl.textContent = modalityMessages[state.modality] || idleMessage;
  };

  // Sincroniza el estado desde el DOM: el navegador puede restaurar valores del formulario al recargar
  const syncStateFromForm = () => {
    state.modality = form.querySelector("input[name='modality']:checked")?.value || null;
    Object.keys(state.values).forEach((name) => {
      const field = form.elements[name];
      if (field) state.values[name] = field.value;
    });
  };

  form.addEventListener("change", (event) => {
    if (event.target.name === "modality") {
      state.modality = event.target.value;
      renderModality();
    }
  });

  form.addEventListener("input", (event) => {
    if (event.target.name in state.values) state.values[event.target.name] = event.target.value;
  });

  // Tarea 2: aquí irán la validación por modalidad y la confirmación de éxito. Los elementos
  // [data-error-for] ya existen para mostrar los errores de cada campo.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
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
