(() => {
  // Datos simulados de solicitudes. No hay backend: el estado vive solo en memoria
  // mientras la pestaña permanece abierta. listingId enlaza con el contrato
  // compartido de js/data.js para reutilizar portada, título, autor y modalidad
  // sin duplicar esa información aquí.
  const mockRequests = [
    { id: "req-01", direction: "received", listingId: "book-03", counterpart: "Isabella C.", status: "Pending", note: "Could I borrow this for the semester? I can pick it up on campus.", updatedAt: "2026-09-24" },
    { id: "req-02", direction: "received", listingId: "book-13", counterpart: "Samuel R.", status: "Pending", note: "I have The Silmarillion to trade if you are interested.", updatedAt: "2026-09-23" },
    { id: "req-03", direction: "received", listingId: "book-09", counterpart: "Laura V.", status: "Accepted", note: "Happy to buy it this week, thank you!", updatedAt: "2026-09-20" },
    { id: "req-04", direction: "received", listingId: "book-17", counterpart: "Mateo C.", status: "Rejected", note: "Would the rental period be flexible?", updatedAt: "2026-09-18" },
    { id: "req-05", direction: "sent", listingId: "book-02", counterpart: "Sofia M.", status: "Pending", note: "I would like to buy this copy if it is still available.", updatedAt: "2026-09-25" },
    { id: "req-06", direction: "sent", listingId: "book-08", counterpart: "Camila T.", status: "Accepted", note: "Requested a two-week loan for a literature course.", updatedAt: "2026-09-22" },
    { id: "req-07", direction: "sent", listingId: "book-06", counterpart: "Nicolas B.", status: "Rejected", note: "Asked about renting for the full term.", updatedAt: "2026-09-19" },
    { id: "req-08", direction: "sent", listingId: "book-16", counterpart: "Gabriela N.", status: "Pending", note: "Offered The Road in exchange for this copy.", updatedAt: "2026-09-25" }
  ];

  // Copia mutable en memoria: create-listing/listing (Integrante 3) no persiste
  // solicitudes reales todavía, así que esta pantalla solo demuestra el flujo.
  const requestsState = mockRequests.map((request) => ({ ...request }));

  const listingsById = new Map((window.TheBridgeData || []).map((listing) => [listing.id, listing]));

  const statusMeta = {
    Pending: { icon: "⏳", label: "Pending", classes: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300" },
    Accepted: { icon: "✅", label: "Accepted", classes: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300" },
    Rejected: { icon: "✕", label: "Rejected", classes: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300" }
  };

  const tablist = document.querySelector("#requests-tablist");
  const tabs = Array.from(document.querySelectorAll("[role='tab']"));
  const panels = {
    received: document.querySelector("#panel-received"),
    sent: document.querySelector("#panel-sent")
  };
  const emptyStates = {
    received: document.querySelector("#requests-empty-received"),
    sent: document.querySelector("#requests-empty-sent")
  };
  const counters = {
    received: document.querySelector("#count-received"),
    sent: document.querySelector("#count-sent")
  };
  const liveRegion = document.querySelector("#requests-live-region");

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  const statusMessageFor = (request) => {
    // El mensaje explica la implicación del nuevo estado, no solo lo repite,
    // porque el criterio de aceptación pide una explicación entendible sin depender del color.
    if (request.status === "Accepted") {
      return request.direction === "received"
        ? `You accepted the request from ${request.counterpart}. Coordinate delivery with them in person; TheBridge does not send messages for you.`
        : `${request.counterpart} accepted your request. Reach out to them to coordinate delivery in person.`;
    }
    if (request.status === "Rejected") {
      return request.direction === "received"
        ? `You rejected the request from ${request.counterpart}. They will see this listing as no longer available to them.`
        : `${request.counterpart} rejected your request. You can look for another listing in the Marketplace.`;
    }
    return request.direction === "received"
      ? `Waiting for you to accept or reject ${request.counterpart}'s request.`
      : `Waiting for ${request.counterpart} to respond to your request.`;
  };

  const renderCard = (request) => {
    const listing = listingsById.get(request.listingId);
    const title = listing ? listing.title : "Listing no longer available";
    const author = listing ? listing.author : "";
    const modality = listing ? listing.modality : request.modality || "";
    const cover = listing ? listing.cover : "";
    const meta = statusMeta[request.status];
    const counterpartLabel = request.direction === "received" ? `From ${request.counterpart}` : `To ${request.counterpart}`;

    const actions =
      request.direction === "received" && request.status === "Pending"
        ? `<div class="mt-3 flex flex-wrap gap-2">
             <button type="button" data-action="accept" data-request-id="${request.id}" class="rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950">Accept</button>
             <button type="button" data-action="reject" data-request-id="${request.id}" class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:border-rose-300 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Reject</button>
           </div>`
        : "";

    return `
      <article class="rounded-[1.5rem] border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40" data-request-card="${request.id}">
        <div class="flex gap-4">
          <img src="${escapeHtml(cover)}" alt="" class="h-20 w-14 shrink-0 rounded-lg object-cover" loading="lazy">
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div class="min-w-0">
                <p class="truncate text-sm font-black">${escapeHtml(title)}</p>
                <p class="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">${escapeHtml(author)} · ${escapeHtml(modality)}</p>
              </div>
              <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-extrabold ${meta.classes}" data-status-badge>
                <span aria-hidden="true">${meta.icon}</span><span>${meta.label}</span>
              </span>
            </div>
            <p class="mt-2 text-xs font-extrabold text-indigo-600 dark:text-indigo-300">${escapeHtml(counterpartLabel)}</p>
            <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">${escapeHtml(request.note)}</p>
            ${actions}
            <p class="mt-3 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400" data-status-explanation>${escapeHtml(statusMessageFor(request))}</p>
          </div>
        </div>
      </article>`;
  };

  const renderPanel = (direction) => {
    const items = requestsState.filter((request) => request.direction === direction);
    panels[direction].innerHTML = items.map(renderCard).join("");
    emptyStates[direction].classList.toggle("hidden", items.length > 0);
    counters[direction].textContent = String(items.length);
  };

  const renderAll = () => {
    renderPanel("received");
    renderPanel("sent");
  };

  const setActiveTab = (direction, { focusTab = false } = {}) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.direction === direction;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      tab.className = isActive
        ? "whitespace-nowrap rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
        : "whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:ring-indigo-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700";
      if (isActive && focusTab) tab.focus();
    });
    panels.received.classList.toggle("hidden", direction !== "received");
    panels.sent.classList.toggle("hidden", direction !== "sent");
  };

  // Navegación por teclado del tablist siguiendo el patrón WAI-ARIA (roving tabindex):
  // flechas izquierda/derecha alternan entre pestañas, Home/End saltan a los extremos.
  tablist.addEventListener("keydown", (event) => {
    const currentIndex = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveTab(tabs[nextIndex].dataset.direction, { focusTab: true });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.direction));
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const request = requestsState.find((item) => item.id === button.dataset.requestId);
    if (!request) return;

    // Cambiamos el estado localmente y volvemos a pintar solo el panel afectado
    // para que el mensaje de explicación quede sincronizado con el nuevo estado.
    request.status = button.dataset.action === "accept" ? "Accepted" : "Rejected";
    renderPanel(request.direction);
    liveRegion.textContent = statusMessageFor(request);
  });

  renderAll();
})();
