const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const page = document.body.dataset.page;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenu(open) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.classList.toggle("active", open);
  mobileMenu.classList.toggle("active", open);
  document.body.classList.toggle("menu-open", open);
  header?.classList.toggle("menu-active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
}

menuToggle?.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("active")));
mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 18);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => link.classList.add("active"));

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
    { threshold: 0.12, rootMargin: "0px 0px -60px" }
  );
  document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
}

const parallax = document.querySelector("[data-parallax]");
if (parallax && !reduceMotion) {
  window.addEventListener(
    "scroll",
    () => {
      const offset = Math.min(window.scrollY * 0.06, 28);
      parallax.style.transform = `translateY(${offset}px)`;
    },
    { passive: true }
  );
}

document.querySelectorAll("[data-before-after]").forEach((comparison) => {
  const range = comparison.querySelector("input");
  const before = comparison.querySelector(".comparison-before");
  function update() {
    const value = `${range.value}%`;
    before.style.width = value;
    before.style.setProperty("--comparison-width", `${comparison.clientWidth}px`);
    comparison.style.setProperty("--pos", value);
  }
  range.addEventListener("input", update);
  window.addEventListener("resize", update);
  update();
});

document.querySelectorAll("[data-filter-group]").forEach((group) => {
  const buttons = group.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".gallery-card");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      cards.forEach((card) => {
        card.classList.toggle("hidden", filter !== "all" && !card.classList.contains(filter));
      });
    });
  });
});

function showToast(message) {
  const old = document.querySelector(".toast");
  old?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  window.setTimeout(() => {
    toast.classList.remove("show");
    window.setTimeout(() => toast.remove(), 260);
  }, 3600);
}

document.querySelectorAll("[data-toast-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    showToast("Спасибо. Специалист LUNA PET SPA скоро свяжется с вами.");
  });
});

document.querySelectorAll("[data-booking-form]").forEach((form) => {
  const steps = [...form.querySelectorAll(".booking-step")];
  const progress = [...form.querySelectorAll(".booking-progress i")];
  const prev = form.querySelector("[data-prev]");
  const next = form.querySelector("[data-next]");
  const submit = form.querySelector("[data-submit]");
  let current = 0;

  function showStep(index) {
    current = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, stepIndex) => step.classList.toggle("active", stepIndex === current));
    progress.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex <= current));
    prev.style.visibility = current === 0 ? "hidden" : "visible";
    next.style.display = current === steps.length - 1 ? "none" : "inline-flex";
    submit.style.display = current === steps.length - 1 ? "inline-flex" : "none";
  }

  prev.addEventListener("click", () => showStep(current - 1));
  next.addEventListener("click", () => showStep(current + 1));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    showStep(0);
    showToast("Спасибо. Наш груминг-специалист скоро свяжется с вами.");
  });

  showStep(0);
});
