document.addEventListener("DOMContentLoaded", () => {
    const path = decodeURIComponent(window.location.pathname);
    let legalPrefix = "pages/Legal/";
    let contactPath = "pages/Contact us/index.html";

    if (path.includes("/pages/Legal/")) {
        legalPrefix = "";
        contactPath = "../Contact us/index.html";
    } else if (path.includes("/pages/")) {
        const afterPages = path.split("/pages/")[1];
        const depth = afterPages.split("/").length - 1;
        const up = "../".repeat(depth);
        legalPrefix = `${up}Legal/`;
        contactPath = `${up}Contact us/index.html`;
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