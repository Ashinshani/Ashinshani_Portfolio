const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelectorAll(".nav-link");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

/* Mobile menu toggle */
menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

/* Close menu when clicking a link (mobile) */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* Active nav link on scroll */
const sections = [...document.querySelectorAll("main#home, section[id]")];

const setActive = () => {
  const scrollY = window.scrollY + 110;

  let currentId = "home";
  for (const sec of sections) {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentId = sec.id || "home";
      break;
    }
  }

  navLinks.forEach(a => {
    const target = a.getAttribute("href").replace("#", "");
    a.classList.toggle("active", target === currentId);
  });
};

window.addEventListener("scroll", setActive);
setActive();

/* Contact form (demo) */
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

function showToast(msg) {
  toastText.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.reset();
  showToast("Message sent! ✅");
});

/* Skill sections JS animation */
// Skills % count animation when section appears
const skillCards = document.querySelectorAll(".skill-card");

const animateCount = (el, target) => {
  let current = 0;
  const duration = 900;
  const stepTime = Math.max(10, Math.floor(duration / target));

  const timer = setInterval(() => {
    current += 1;
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, stepTime);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const card = entry.target;
    const target = parseInt(card.dataset.percent, 10);
    const counter = card.querySelector(".count");

    if (!card.dataset.done) {
      animateCount(counter, target);
      card.dataset.done = "true";
    }
  });
}, { threshold: 0.35 });

skillCards.forEach(card => observer.observe(card));

/* Skills slider functionality */
const skillsGrid = document.querySelector("#skillsSlider .skills-grid");
const skillsNext = document.getElementById("skillsNext");
const skillsPrev = document.getElementById("skillsPrev");

function getScrollAmount() {
  // Scroll by ~1 card width (works even if card width changes)
  const firstCard = skillsGrid?.children?.[0];
  if (!firstCard) return 300;

  const cardWidth = firstCard.getBoundingClientRect().width;
  return Math.round(cardWidth + 26); // 26 = your gap
}

skillsNext.addEventListener("click", () => {
  skillsGrid.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
});

skillsPrev.addEventListener("click", () => {
  skillsGrid.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
});


