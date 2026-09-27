(() => {
  const FALLBACK_ID = "book-01";

  const SEED_PERSONAL_BOOKS = [
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

  const modalityInfo = {
    Exchange: { icon: "🔄", cta: "Request Exchange", title: "Request an exchange" },
    Loan: { icon: "🤝", cta: "Request Loan", title: "Confirm your loan request" },
    Rental: { icon: "📅", cta: "Request Rental", title: "Confirm your rental request" },
    Sale: { icon: "🏷️", cta: "Request Purchase", title: "Confirm your purchase request" }
  };

  const CTA_CLASS = "h-12 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-black text-white shadow-lg shadow-indigo-500/15 transition hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25 sm:w-auto sm:min-w-[220px]";
  const CTA_SENT_CLASS = "h-12 w-full cursor-default rounded-2xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 focus:outline-none focus:ring-4 focus:ring-blue-500/25 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300 sm:w-auto sm:min-w-[220px]";

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-CO", { style: "currency", currency: "COP", currencyDisplay: "code", maximumFractionDigits: 0 }).format(value);

  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const $ = (selector) => document.querySelector(selector);
  const elements = {
    cta: $("#request-cta"),
    modal: $("#request-modal"),
    modalTitle: $("#request-title"),
    modalBody: $("#request-body"),
    modalLive: $("#request-live")
  };

  const state = { listing: null, requestSent: false, offerable: [] };

  const loadAvailablePersonalBooks = () => {
    let stored = [];
    try {
      const parsed = JSON.parse(localStorage.getItem("thebridge:my-books") || "[]");
      if (Array.isArray(parsed)) stored = parsed;
    } catch {
      stored = [];
    }
    const byId = new Map(SEED_PERSONAL_BOOKS.map((book) => [book.id, book]));
    stored.forEach((book) => {
      if (book && typeof book.id === "string") byId.set(book.id, { ...byId.get(book.id), ...book });
    });
    return [...byId.values()].filter((book) => book.status === "Available" && typeof book.title === "string");
  };

  const resolveListing = (listings) => {
    const requestedId = new URLSearchParams(window.location.search).get("id");
    const match = requestedId ? listings.find((item) => item.id === requestedId) : null;
    if (match) return { listing: match, notice: null };

    const listing = listings.find((item) => item.id === FALLBACK_ID) || listings[0];
    return {
      listing,
      notice: requestedId
        ? { title: "We couldn't find that listing", text: `There is no listing with the ID “${requestedId}”, so we are showing ${listing.title} instead.` }
        : { title: "No listing selected", text: `Open a listing from the Marketplace to see its details. For now we are showing ${listing.title}.` }
    };
  };

  const offerRows = (listing) => {
    const duration = listing.duration || "To be agreed";
    const price = typeof listing.price === "number" ? formatPrice(listing.price) : "To be agreed";
    if (listing.modality === "Exchange") {
      return [{
        label: "Wants in exchange",
        value: listing.desiredBook || "Open to offers",
        note: listing.desiredBook ? "" : "The owner will consider any book you offer."
      }];
    }
    if (listing.modality === "Loan") return [{ label: "Loan duration", value: duration }];
    if (listing.modality === "Rental") return [{ label: "Rental price", value: price }, { label: "Rental duration", value: duration }];
    return [{ label: "Sale price", value: price }];
  };

  const wireCoverFallback = (img, fallback) => {
    img.addEventListener("error", () => {
      img.classList.add("hidden");
      fallback.classList.remove("hidden");
    }, { once: true });
  };

  const renderListing = (listing) => {
    document.title = `TheBridge — ${listing.title}`;
    $("#listing-title").textContent = listing.title;
    $("#listing-author").textContent = `by ${listing.author}`;

    const info = modalityInfo[listing.modality];
    $("#listing-modality").textContent = `${info.icon} ${listing.modality}`;
    $("#listing-condition").textContent = `📚 ${listing.condition}`;
    $("#listing-status").textContent = listing.status === "Available" ? "✅ Available" : `⏳ ${listing.status}`;

    const cover = $("#listing-cover");
    const fallback = $("#listing-cover-fallback");
    fallback.style.background = genreColors[listing.genre] || genreColors.Default;
    cover.src = listing.cover;
    cover.alt = `Cover of ${listing.title} by ${listing.author}`;
    wireCoverFallback(cover, fallback);

    if (Array.isArray(listing.sellerPhotos) && listing.sellerPhotos.length) {
      $("#photos-list").innerHTML = listing.sellerPhotos
        .map((photo, index) => `<li><img src="${escapeHtml(photo)}" alt="Seller photo ${index + 1} showing the physical condition of ${escapeHtml(listing.title)}" class="aspect-[4/3] w-full rounded-xl border border-slate-200 object-cover dark:border-slate-800"></li>`)
        .join("");
      $("#photos-block").classList.remove("hidden");
    }

    $("#offer-details").innerHTML = offerRows(listing)
      .map((row) => `<div class="min-w-0"><dt class="text-xs font-extrabold uppercase tracking-[0.12em] text-indigo-700 dark:text-indigo-300">${escapeHtml(row.label)}</dt><dd class="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white">${escapeHtml(row.value)}</dd>${row.note ? `<dd class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">${escapeHtml(row.note)}</dd>` : ""}</div>`)
      .join("");

    $("#listing-description").textContent = listing.description;
    $("#listing-owner").textContent = listing.owner;
    $("#listing-university").textContent = listing.university;

    const meta = [["Genre", listing.genre], ["Year", listing.year], ["Publisher", listing.publisher], ["Language", listing.language], ["ISBN", listing.isbn]]
      .filter(([, value]) => value);
    $("#listing-meta").innerHTML = meta
      .map(([label, value]) => `<div class="min-w-0"><dt class="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">${label}</dt><dd class="mt-1 break-words text-sm font-extrabold text-slate-950 dark:text-white">${escapeHtml(value)}</dd></div>`)
      .join("");

    updateCta();
  };

  const updateCta = () => {
    const { cta } = elements;
    if (state.requestSent) {
      cta.textContent = "✓ Request sent";
      cta.setAttribute("aria-disabled", "true");
      cta.className = CTA_SENT_CLASS;
    } else {
      cta.textContent = modalityInfo[state.listing.modality].cta;
      cta.removeAttribute("aria-disabled");
      cta.className = CTA_CLASS;
    }
  };

  const summaryRows = (rows) =>
    `<dl class="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">${rows
      .map(({ label, value }) => `<div class="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"><dt class="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">${escapeHtml(label)}</dt><dd class="text-sm font-extrabold text-slate-950 sm:text-right dark:text-white">${escapeHtml(value)}</dd></div>`)
      .join("")}</dl>`;

  const listingRows = (listing) => [
    { label: "Book", value: `${listing.title} — ${listing.author}` },
    { label: "Owner", value: listing.owner },
    ...offerRows(listing).map(({ label, value }) => ({ label, value }))
  ];

  const bookOption = (book, index) => `<li>
    <label class="relative block cursor-pointer">
      <input type="radio" name="offeredBook" value="${escapeHtml(book.id)}" ${index === 0 ? "data-initial-focus" : ""} class="peer sr-only">
      <span class="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-3 pr-12 transition hover:border-indigo-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-focus-visible:ring-4 peer-focus-visible:ring-blue-500/25 dark:border-slate-700 dark:bg-slate-950 dark:peer-checked:border-indigo-400 dark:peer-checked:bg-indigo-950/40">
        <span data-offer-cover class="relative h-16 w-11 shrink-0 overflow-hidden rounded-lg" style="background:${genreColors[book.genre] || genreColors.Default}">${book.cover ? `<img src="${escapeHtml(book.cover)}" alt="" class="h-full w-full object-cover">` : ""}</span>
        <span class="min-w-0"><span class="block truncate text-sm font-extrabold text-slate-950 dark:text-white">${escapeHtml(book.title)}</span><span class="block truncate text-xs text-slate-500 dark:text-slate-400">${escapeHtml(book.author || "Unknown author")} · ${escapeHtml(book.condition || "Condition not set")}</span></span>
      </span>
      <span aria-hidden="true" class="pointer-events-none absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-indigo-600 text-xs font-black text-white opacity-0 transition peer-checked:opacity-100">✓</span>
    </label>
  </li>`;

  const cancelButton = `<button type="button" data-action="close" class="h-12 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-extrabold text-slate-700 transition hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Cancel</button>`;
  const sendButtonClass = "h-12 rounded-2xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-50";

  const renderRequestView = () => {
    const { listing, offerable } = state;
    elements.modalTitle.textContent = modalityInfo[listing.modality].title;

    let intro;
    let sendAttrs = "data-initial-focus";
    if (listing.modality === "Exchange") {
      if (offerable.length) {
        intro = `<p class="text-sm leading-6 text-slate-600 dark:text-slate-300">To request <strong class="font-extrabold text-slate-950 dark:text-white">${escapeHtml(listing.title)}</strong>, you must select one of your available books to offer in exchange.</p>
          ${summaryRows(listingRows(listing).filter((row) => row.label !== "Owner"))}
          <fieldset class="mt-5" aria-describedby="offer-error">
            <legend class="text-sm font-extrabold text-slate-800 dark:text-slate-100">Your available books</legend>
            <ul class="mt-3 space-y-2">${offerable.map(bookOption).join("")}</ul>
            <p id="offer-error" role="alert" class="hidden mt-3 text-sm font-bold text-rose-600 before:mr-1 before:content-['⚠'] dark:text-rose-400"></p>
          </fieldset>`;
        sendAttrs = "";
      } else {
        intro = `<p class="text-sm leading-6 text-slate-600 dark:text-slate-300">To request <strong class="font-extrabold text-slate-950 dark:text-white">${escapeHtml(listing.title)}</strong>, you must select one of your available books to offer in exchange.</p>
          <div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
            <p class="text-sm font-extrabold text-amber-900 dark:text-amber-200">⚠ You have no available books to offer</p>
            <p class="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-300">Books that are already listed or loaned out can't be offered. Add a book to your library first.</p>
            <a href="add-book.html" data-initial-focus class="mt-3 inline-block rounded-lg text-sm font-extrabold text-amber-900 underline underline-offset-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:text-amber-200">Add a book</a>
          </div>`;
      }
    } else {
      intro = `<p class="text-sm leading-6 text-slate-600 dark:text-slate-300">Review the listing and send your request to <strong class="font-extrabold text-slate-950 dark:text-white">${escapeHtml(listing.owner)}</strong>. This is a request only: no payment is made.</p>
        <div class="mt-4">${summaryRows(listingRows(listing))}</div>`;
    }

    const disableSend = listing.modality === "Exchange" && !offerable.length;
    elements.modalBody.innerHTML = `<form id="request-form" novalidate>${intro}
      <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">${cancelButton}
        <button type="submit" ${sendAttrs} ${disableSend ? "disabled" : ""} class="${sendButtonClass}">Send Request</button>
      </div></form>`;

    elements.modalBody.querySelectorAll("[data-offer-cover] img").forEach((img) => {
      img.addEventListener("error", () => img.classList.add("hidden"), { once: true });
    });
  };

  const renderSuccessView = (offered) => {
    const { listing } = state;
    elements.modalTitle.textContent = "Request sent successfully";
    const rows = [{ label: "Listing", value: `${listing.title} — ${listing.author}` }, { label: "Type", value: listing.modality }];
    if (offered) rows.push({ label: "You offered", value: `${offered.title} — ${offered.author || "Unknown author"}` });
    else rows.push(...offerRows(listing).map(({ label, value }) => ({ label, value })));

    elements.modalBody.innerHTML = `<div class="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <span aria-hidden="true" class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-xl font-black text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">✓</span>
        <p class="text-sm font-semibold leading-6 text-emerald-900 dark:text-emerald-200">${escapeHtml(listing.owner)} will see your request. This is a simulation: nothing was sent or saved.</p>
      </div>
      <div class="mt-4">${summaryRows(rows)}</div>
      <div class="mt-6 flex justify-end"><button type="button" data-action="close" data-initial-focus class="${sendButtonClass}">Done</button></div>`;
    elements.modalLive.textContent = "";
    setTimeout(() => { elements.modalLive.textContent = "Request sent successfully."; }, 50);
  };

  const setBackgroundInert = (inert) => {
    document.querySelectorAll("body > :not(#request-modal):not(script)").forEach((el) => { el.inert = inert; });
  };

  const openModal = () => {
    if (state.requestSent) return;
    state.offerable = state.listing.modality === "Exchange" ? loadAvailablePersonalBooks() : [];
    elements.modalLive.textContent = "";
    renderRequestView();
    elements.modal.classList.remove("hidden");
    document.documentElement.classList.add("overflow-hidden");
    setBackgroundInert(true);
    (elements.modalBody.querySelector("[data-initial-focus]") || elements.modalTitle).focus();
  };

  const closeModal = () => {
    if (elements.modal.classList.contains("hidden")) return;
    elements.modal.classList.add("hidden");
    document.documentElement.classList.remove("overflow-hidden");
    setBackgroundInert(false);
    elements.cta.focus();
  };

  const sendRequest = (form) => {
    let offered = null;
    if (state.listing.modality === "Exchange") {
      if (!state.offerable.length) return;
      offered = state.offerable.find((book) => book.id === new FormData(form).get("offeredBook"));
      if (!offered) {
        const error = $("#offer-error");
        error.textContent = "Select a book to offer.";
        error.classList.remove("hidden");
        form.querySelector("input[type='radio']").focus();
        return;
      }
    }
    state.requestSent = true;
    updateCta();
    renderSuccessView(offered);
    elements.modalBody.querySelector("[data-initial-focus]").focus();
  };

  elements.cta.addEventListener("click", () => {
    if (elements.cta.getAttribute("aria-disabled") !== "true") openModal();
  });

  elements.modal.addEventListener("click", (event) => {
    if (event.target.id === "request-backdrop" || event.target.id === "request-modal" || event.target.closest("[data-action='close']")) closeModal();
  });

  elements.modal.addEventListener("submit", (event) => {
    event.preventDefault();
    sendRequest(event.target);
  });

  elements.modal.addEventListener("change", (event) => {
    if (event.target.name === "offeredBook") $("#offer-error")?.classList.add("hidden");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.modal.classList.contains("hidden")) {
      event.preventDefault();
      closeModal();
    }
  });

  const listings = Array.isArray(window.TheBridgeData) ? window.TheBridgeData : [];
  if (!listings.length) {
    $("#listing-notice-title").textContent = "Listings are unavailable";
    $("#listing-notice-text").textContent = "The listing data could not be loaded. Please try again later.";
    $("#listing-notice").classList.remove("hidden");
    $("#listing-title").textContent = "Listing unavailable";
    elements.cta.classList.add("hidden");
    return;
  }

  const { listing, notice } = resolveListing(listings);
  state.listing = listing;
  renderListing(listing);

  if (notice) {
    $("#listing-notice-title").textContent = notice.title;
    $("#listing-notice-text").textContent = notice.text;
    $("#listing-notice").classList.remove("hidden");
  }
})();
