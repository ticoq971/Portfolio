// Gestion du menu burger pour mobile
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  // Toggle navigation
  nav.classList.toggle("active");

  // Animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Burger animation
  burger.classList.toggle("toggle");
});

// Smooth scroll amélioré
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Animation au scroll améliorée
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animation séquentielle pour les éléments de liste
      if (entry.target.classList.contains("skill-category")) {
        const items = entry.target.querySelectorAll("li");
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
          }, index * 100);
        });
      }
    }
  });
}, observerOptions);

// Observer les éléments à animer
document
  .querySelectorAll(".project-card, .skill-category, .about-content")
  .forEach((el) => {
    observer.observe(el);
  });

// Gestion du formulaire de contact avec animation
const contactForm = document.getElementById("contact-form");
const formInputs = contactForm.querySelectorAll("input, textarea");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Animation du bouton d'envoi
  const submitBtn = contactForm.querySelector(".submit-btn");
  submitBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    submitBtn.style.transform = "scale(1)";
  }, 200);

  // Récupération des données du formulaire
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
  console.log("Données du formulaire:", data);

  // Réinitialisation du formulaire avec animation
  formInputs.forEach((input) => {
    input.style.transform = "translateY(-10px)";
    input.style.opacity = "0";
    setTimeout(() => {
      input.value = "";
      input.style.transform = "translateY(0)";
      input.style.opacity = "1";
    }, 300);
  });

  // Message de confirmation avec animation
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.textContent = "Message envoyé avec succès !";
  contactForm.appendChild(successMessage);

  setTimeout(() => {
    successMessage.remove();
  }, 3000);
});

// Animation de la barre de navigation au scroll améliorée
let lastScroll = 0;
const navbar = document.querySelector(".navbar");
let scrollTimeout;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Clear timeout
  clearTimeout(scrollTimeout);

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    // Scroll Down
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    // Scroll Up
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");

    // Reset scroll direction after 1 second of no scrolling
    scrollTimeout = setTimeout(() => {
      navbar.classList.remove("scroll-up");
    }, 1000);
  }

  lastScroll = currentScroll;
});

// Animation des compétences avec progression
const skillCategories = document.querySelectorAll(".skill-category");



// Animation du texte de la section héro
const heroText = document.querySelector(".hero-content h1");
const text = heroText.textContent;
heroText.textContent = "";

text.split("").forEach((char, index) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.animationDelay = `${index * 0.05}s`;
  heroText.appendChild(span);
});
