// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Back to top button functionality
const backToTopButton = document.getElementById("back-to-top");
let lastScrollPosition = 0;
let ticking = false;

function updateBackToTopButton(scrollPos) {
  // Show button when scrolled down 300px
  if (scrollPos > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
}

// Throttle scroll events
window.addEventListener("scroll", () => {
  lastScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateBackToTopButton(lastScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
});

// Custom smooth scroll animation
function smoothScrollToTop() {
  const startPosition = window.pageYOffset;
  const duration = 1000; // Animation duration in milliseconds
  let startTime = null;

  // Easing function for smooth deceleration
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeProgress = easeOutCubic(progress);
    const scrollPosition = Math.max(
      startPosition - startPosition * easeProgress,
      0
    );

    window.scrollTo(0, scrollPosition);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Update back to top button click event
backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  smoothScrollToTop();
});

// Active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNavLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Form submission handling (just prevent default since we don't have a backend)
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Ви благодариме на пораката! Ова е демо форма без позадинска функционалност."
  );
  contactForm.reset();
});

// Add animation to progress bars when they come into view
const progressBars = document.querySelectorAll(".progress-bar[data-progress]");
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const progress = progressBar.getAttribute("data-progress");
      progressBar.style.setProperty("--progress-width", progress);
    }
  });
}, observerOptions);

progressBars.forEach((bar) => {
  observer.observe(bar);
});
