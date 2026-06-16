const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const mobileLinks = mobileMenu.querySelectorAll("a");
const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenu(open) {
  menuToggle.classList.toggle("active", open);
  mobileMenu.classList.toggle("active", open);
  header.classList.toggle("menu-active", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  mobileMenu.setAttribute("aria-hidden", String(!open));
}

menuToggle.addEventListener("click", () => {
  setMenu(!mobileMenu.classList.contains("active"));
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
    setMenu(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080 && mobileMenu.classList.contains("active")) {
    setMenu(false);
  }
});

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        window.setTimeout(() => entry.target.classList.add("visible"), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -45px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-38% 0px -52%", threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const heroVisual = document.querySelector(".hero-visual");
const floatingCards = heroVisual ? heroVisual.querySelectorAll("[data-float]") : [];

if (heroVisual && floatingCards.length && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    floatingCards.forEach((card) => {
      const depth = Number(card.dataset.float);
      const baseRotation = card.classList.contains("card-web")
        ? -4
        : card.classList.contains("card-bot")
          ? 4
          : -1.5;
      card.style.transform = `translate3d(${x * depth * 7}px, ${y * depth * 7}px, 0) rotate(${baseRotation}deg)`;
    });
  });

  heroVisual.addEventListener("pointerleave", () => {
    floatingCards.forEach((card) => {
      const baseRotation = card.classList.contains("card-web")
        ? -4
        : card.classList.contains("card-bot")
          ? 4
          : -1.5;
      card.style.transform = `rotate(${baseRotation}deg)`;
    });
  });
}
