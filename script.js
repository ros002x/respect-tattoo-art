const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

const contactConfig = {
  whatsappNumber: "",
  instagramUrl: "",
};

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  header.classList.remove("is-open");
  nav.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  header.classList.toggle("is-open", isOpen);
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMenu();
  }
});

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const message = [
    "Ciao Maurizio, vorrei informazioni per un tatuaggio.",
    `Nome: ${data.get("nome")}`,
    `Idea: ${data.get("idea")}`,
    `Contatto: ${data.get("contatto")}`,
  ].join("\n");

  if (contactConfig.whatsappNumber) {
    const number = contactConfig.whatsappNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    return;
  }

  navigator.clipboard?.writeText(message).then(
    () => {
      formNote.textContent = "Messaggio copiato. Aggiungi il numero WhatsApp ufficiale in script.js per inviarlo direttamente.";
    },
    () => {
      formNote.textContent = message;
    },
  );
});
