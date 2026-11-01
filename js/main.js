// PrintLab — interacciones de la página (sin librerías).
// Todo funciona igual sin JavaScript: el menú queda accesible por los links,
// la galería muestra todo y cada foto abre la imagen grande.

(function () {
  "use strict";

  /* ---------- Encabezado: borde al bajar ---------- */
  var header = document.querySelector("[data-header]");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Menú en celular ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (toggle.getAttribute("aria-expanded") === "true" && !e.target.closest("[data-header]")) {
      setMenu(false);
    }
  });

  /* ---------- Filtros de la galería ---------- */
  var filters = document.querySelector("[data-filters]");
  var status = document.querySelector("[data-filter-status]");
  var works = Array.prototype.slice.call(document.querySelectorAll("[data-gallery] .work"));

  filters.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-filter]");
    if (!btn) return;
    var cat = btn.getAttribute("data-filter");

    filters.querySelectorAll("[data-filter]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b === btn));
    });

    var shown = 0;
    works.forEach(function (w) {
      var match = cat === "todo" || w.getAttribute("data-cat") === cat;
      w.hidden = !match;
      if (match) shown++;
    });
    status.textContent = shown + (shown === 1 ? " trabajo" : " trabajos") + " en " + btn.textContent.trim();
  });

  /* ---------- Visor de fotos ---------- */
  var dialog = document.querySelector("[data-lightbox]");
  if (!dialog || typeof dialog.showModal !== "function") return; // navegador viejo: el link abre la foto

  var lbImg = dialog.querySelector("[data-lb-img]");
  var lbName = dialog.querySelector("[data-lb-name]");
  var lbTag = dialog.querySelector("[data-lb-tag]");
  var lbCount = dialog.querySelector("[data-lb-count]");
  var current = 0;
  var list = [];
  var opener = null;

  function visibleWorks() {
    return works.filter(function (w) { return !w.hidden; });
  }

  function show(index) {
    current = (index + list.length) % list.length;
    var w = list[current];
    var link = w.querySelector(".work-link");
    var thumb = link.querySelector("img");
    lbImg.src = link.getAttribute("href");
    lbImg.alt = thumb.alt;
    lbName.textContent = w.querySelector(".work-name").textContent;
    lbTag.textContent = w.querySelector(".work-tag").textContent;
    lbCount.textContent = (current + 1) + " de " + list.length;
  }

  document.querySelector("[data-gallery]").addEventListener("click", function (e) {
    var link = e.target.closest(".work-link");
    if (!link) return;
    e.preventDefault();
    list = visibleWorks();
    opener = link;
    show(list.indexOf(link.closest(".work")));
    dialog.showModal();
  });

  dialog.querySelector("[data-lb-close]").addEventListener("click", function () { dialog.close(); });
  dialog.querySelector("[data-lb-prev]").addEventListener("click", function () { show(current - 1); });
  dialog.querySelector("[data-lb-next]").addEventListener("click", function () { show(current + 1); });

  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
  });

  // Tocar fuera de la foto cierra el visor
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || e.target.classList.contains("lightbox-inner")) dialog.close();
  });

  // Deslizar con el dedo para pasar de foto
  var startX = null;
  dialog.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
    startX = null;
  });

  dialog.addEventListener("close", function () {
    lbImg.removeAttribute("src");
    if (opener) opener.focus();
  });
})();
