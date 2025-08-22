// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const contactForm = document.getElementById("contactForm");

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(27, 38, 44, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(27, 38, 44, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + "+";
    }
  }, 16);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation class
      entry.target.classList.add("animate-in");

      // Animate stats counters
      if (entry.target.classList.contains("about")) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.textContent);
          stat.textContent = "0+";
          setTimeout(() => animateCounter(stat, target), 500);
        });
      }

      // Animate skill cards
      if (entry.target.classList.contains("skills")) {
        const skillCards = entry.target.querySelectorAll(".skill-card");
        skillCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 100);
        });
      }

      // Animate project cards
      if (entry.target.classList.contains("projects")) {
        const projectCards = entry.target.querySelectorAll(".project-card");
        projectCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 150);
        });
      }
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach((section) => {
  observer.observe(section);
});

// Initialize skill and project cards with hidden state
document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card");
  const projectCards = document.querySelectorAll(".project-card");

  skillCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
  });

  projectCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
  });
});

// Contact form handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn-primary");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;

  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  const autoRemove = setTimeout(() => {
    removeNotification(notification);
  }, 5000);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      clearTimeout(autoRemove);
      removeNotification(notification);
    });
}

function removeNotification(notification) {
  notification.style.transform = "translateX(400px)";
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero");

  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add CSS for loading animation
const loadingStyles = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject loading styles
const styleSheet = document.createElement("style");
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Smooth reveal animations for sections
const revealElements = document.querySelectorAll("section > *");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// Add cursor trail effect
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function createTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;

  requestAnimationFrame(createTrail);
}

createTrail();

// Add interactive hover effects for cards
document.querySelectorAll(".skill-card, .project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

console.log("Portfolio website loaded successfully! 🚀");
