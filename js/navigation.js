(() => {
  const root = document.documentElement;
  const sidebar = document.querySelector("#desktop-sidebar");
  const appShellMain = document.querySelector("#app-shell-main");
  const sidebarToggle = document.querySelector("#sidebar-toggle");
  const sidebarLabels = document.querySelectorAll("[data-sidebar-label]");
  const themeToggles = document.querySelectorAll("[data-theme-toggle]");
  const connectionStatuses = document.querySelectorAll("[data-connection-status]");
  const connectionDots = document.querySelectorAll("[data-connection-dot]");
  const connectionTexts = document.querySelectorAll("[data-connection-text]");
  const mobileMoreToggle = document.querySelector("#mobile-more-toggle");
  const mobileMoreMenu = document.querySelector("#mobile-more-menu");
  const mobileMoreBackdrop = document.querySelector("#mobile-more-backdrop");
  const cartLinkBadges = document.querySelectorAll("[data-cart-count-badge]");

  const readStorage = (key, fallback = null) => {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      return;
    }
  };

  const applyTheme = (theme) => {
    const dark = theme === "dark";
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";

    themeToggles.forEach((toggle) => {
      const thumb = toggle.querySelector("[data-theme-thumb]");
      const sun = toggle.querySelector("[data-theme-sun]");
      const moon = toggle.querySelector("[data-theme-moon]");
      if (thumb) thumb.style.transform = dark ? "translateX(34px)" : "translateX(0)";
      sun?.classList.toggle("text-amber-500", !dark);
      sun?.classList.toggle("text-slate-400", dark);
      moon?.classList.toggle("text-indigo-300", dark);
      moon?.classList.toggle("text-slate-400", !dark);
      toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("aria-pressed", String(dark));
    });

    writeStorage("thebridge:theme", theme);
  };

  const storedTheme = readStorage("thebridge:theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(storedTheme === "dark" || storedTheme === "light" ? storedTheme : preferredTheme);

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      applyTheme(root.classList.contains("dark") ? "light" : "dark");
    });
  });

  const setSidebarCollapsed = (collapsed) => {
    if (!sidebar || !appShellMain) return;
    sidebar.classList.toggle("lg:w-20", collapsed);
    sidebar.classList.toggle("lg:w-64", !collapsed);
    appShellMain.classList.toggle("lg:pl-20", collapsed);
    appShellMain.classList.toggle("lg:pl-64", !collapsed);
    sidebarLabels.forEach((label) => label.classList.toggle("lg:hidden", collapsed));
    sidebarToggle?.setAttribute("aria-expanded", String(!collapsed));
    writeStorage("thebridge:sidebar-collapsed", String(collapsed));
  };

  setSidebarCollapsed(readStorage("thebridge:sidebar-collapsed") === "true");
  sidebarToggle?.addEventListener("click", () => setSidebarCollapsed(!sidebar.classList.contains("lg:w-20")));

  const setConnectionState = () => {
    const online = navigator.onLine;
    connectionStatuses.forEach((status) => {
      status.className = online
        ? "flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-xs font-extrabold text-emerald-700 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
        : "flex h-10 items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 text-xs font-extrabold text-amber-800 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300";
    });
    connectionDots.forEach((dot) => {
      dot.className = online
        ? "h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"
        : "h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.12)]";
    });
    connectionTexts.forEach((text) => {
      text.textContent = online ? "Online" : "Offline";
    });
    window.dispatchEvent(new CustomEvent("thebridge:network-change", { detail: { online } }));
  };

  const setMobileMoreOpen = (open) => {
    mobileMoreMenu?.classList.toggle("hidden", !open);
    mobileMoreBackdrop?.classList.toggle("hidden", !open);
    mobileMoreToggle?.setAttribute("aria-expanded", String(open));
  };

  const updateCartLinkBadges = () => {
    let count = 0;
    try {
      const ids = JSON.parse(localStorage.getItem("thebridge:cart") || "[]");
      count = Array.isArray(ids) ? ids.length : 0;
    } catch {
      count = 0;
    }
    cartLinkBadges.forEach((badge) => {
      badge.textContent = String(count);
      badge.classList.toggle("hidden", count === 0);
    });
  };

  mobileMoreToggle?.addEventListener("click", () => setMobileMoreOpen(mobileMoreToggle.getAttribute("aria-expanded") !== "true"));
  mobileMoreBackdrop?.addEventListener("click", () => setMobileMoreOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileMoreOpen(false);
  });

  window.addEventListener("online", setConnectionState);
  window.addEventListener("offline", setConnectionState);
  window.addEventListener("storage", updateCartLinkBadges);
  window.addEventListener("thebridge:cart-change", updateCartLinkBadges);
  setConnectionState();
  updateCartLinkBadges();
})();
