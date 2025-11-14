// script.js — navegación por data-target con delegación + acordeón + marcas activas
document.addEventListener("DOMContentLoaded", () => {
  const pages = Array.from(document.querySelectorAll(".page"));
  const bottomButtons = Array.from(document.querySelectorAll("nav.bottom-nav button"));
  const allDataBtns = []; // para referencia (llenado abajo)

  // función principal: mostrar página por id
  function openPage(id) {
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) {
      console.warn("openPage: no existe sección con id:", id);
      return;
    }
    pages.forEach(p => p.classList.remove("active"));
    target.classList.add("active");
    // marcar botón activo en bottom-nav (si existe)
    bottomButtons.forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-target") === id);
    });
    // llevar al top suavemente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Delegación: cualquier elemento con atributo data-target hará la navegación
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-target]");
    if (!btn) return;
    const targetId = btn.getAttribute("data-target");
    // evita que enlaces con href actúen por defecto
    if (btn.tagName.toLowerCase() === "a" && btn.getAttribute("href")?.startsWith("#") ) {
      e.preventDefault();
    }
    openPage(targetId);
  });

  // Si hay hash en la URL, abrir la página correspondiente
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    openPage(hash);
  } else {
    // fallback: abrir 'home' si existe
    openPage("home");
  }

  // Acordeón: elementos .acc-btn seguidos por .acc-panel
  const accBtns = Array.from(document.querySelectorAll(".acc-btn"));
  accBtns.forEach(btn => {
    const panel = btn.nextElementSibling;
    // inicializar altura 0
    if (panel) panel.style.maxHeight = panel.classList.contains("open") ? panel.scrollHeight + "px" : null;
    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
      if (!panel) return;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Mejora visual: marcar el botón bottom-nav activo si el usuario navega con back/forward
  window.addEventListener("popstate", () => {
    const h = window.location.hash.replace("#", "");
    if (h) openPage(h);
  });
  

  // Opcional: permitir cambiar hash al navegar (útil para compartir enlaces)
  // Si quieres que la URL muestre la sección, descomenta la siguiente línea:
  // history.replaceState(null, "", `#${document.querySelector(".page.active").id}`);

  // DEBUG: si no funciona, muestra en consola la lista de sections y botones
  // console.log("Páginas detectadas:", pages.map(p => p.id));
  // console.log("Bottom buttons:", bottomButtons.map(b => b.getAttribute("data-target")));
});
// =========================
//   LIGHTBOX para imágenes
// =========================
const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxVideo = document.getElementById("lightboxVideo");
const closeBtn = document.getElementById("closeLightbox");

// Abrir lightbox cuando tocan una imagen
galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.style.display = "block";
    lightboxVideo.style.display = "none";
    lightboxImg.src = img.src;
  });
});

// Cerrar lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Cerrar al tocar fuera
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
/* ------------------------------
   ACORDEONES DE IMPACTO
------------------------------ */
const accButtons = document.querySelectorAll(".acc-btn");

accButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Cerrar otros acordeones
    accButtons.forEach(other => {
      if (other !== btn) {
        other.nextElementSibling.style.display = "none";
      }
    });

    // Alternar el panel clickeado
    const panel = btn.nextElementSibling;
    panel.style.display = (panel.style.display === "block") ? "none" : "block";
  });
});
/* ------------------------------
   ACORDEÓN DE ACCIONES – MINI
------------------------------ */
const miniBtns = document.querySelectorAll(".acc-mini");

miniBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    // Cerrar todos menos el clickeado
    miniBtns.forEach(other => {
      if (other !== btn) {
        other.nextElementSibling.style.maxHeight = null;
      }
    });

    const panel = btn.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  });
});

