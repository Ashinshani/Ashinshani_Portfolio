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
