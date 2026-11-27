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
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    let legalPrefix = "pages/Legal/";
    let contactPath = "pages/Contact us/index.html";

    if (path.includes("/pages/Legal/")) {
        legalPrefix = "";
        contactPath = "../Contact us/index.html";
    } else if (path.includes("/pages/")) {
        legalPrefix = "../Legal/";
        contactPath = "../Contact us/index.html";
    }

    const footerHTML = `
    <footer class="site-footer">
      <p>
        &copy; 2026 NA Scoliosis Foundation NPC (NPO 265-653). All rights reserved. |
        <a href="${legalPrefix}privacy-policy.html">Privacy Policy</a> |
        <a href="${legalPrefix}terms-of-use.html">Terms of Use</a> |
        <a href="${contactPath}">Contact Us</a>
      </p>
    </footer>
  `;

    if (!document.querySelector("footer")) {
        document.body.insertAdjacentHTML("beforeend", footerHTML);
    }
});