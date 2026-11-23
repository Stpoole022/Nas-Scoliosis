document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme toggle (persists in localStorage)
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("nas-theme") || "light";
    root.setAttribute("data-theme", savedTheme);

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            localStorage.setItem("nas-theme", next);
        });
    }

    // 2. Mobile menu drawer (keeps Donate button always visible)
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("main-nav");
    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            const expanded = menuBtn.getAttribute("aria-expanded") === "true";
            menuBtn.setAttribute("aria-expanded", String(!expanded));
            navMenu.classList.toggle("is-open");
        });
    }
});