// ===============================
// SMOOTH SCROLL NAVIGATION
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ===============================
// SCROLL PROGRESS BAR
// ===============================
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop ||
    document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (winScroll / height) * 100;

  document.querySelector(".scroll-progress").style.width =
    scrolled + "%";
});

// ===============================
// BACK TO TOP BUTTON
// ===============================
const backToTop = document.getElementById("backToTop");

backToTop.style.display = "none";

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===============================
// ACTIVE NAVBAR LINK HIGHLIGHT
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (
      link.getAttribute("href").includes(current)
    ) {
      link.classList.add("active");
    }
  });
});

// ===============================
// HERO ENTRY ANIMATION
// ===============================
window.addEventListener("load", () => {
  const heroContent =
    document.querySelector(".hero-content");

  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform =
      "translateY(40px)";

    setTimeout(() => {
      heroContent.style.transition =
        "all 1.2s ease";
      heroContent.style.opacity = "1";
      heroContent.style.transform =
        "translateY(0)";
    }, 300);
  }
});

// ===============================
// CUSTOM CURSOR
// ===============================
const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");

const cursorOutline =
  document.createElement("div");
cursorOutline.classList.add(
  "cursor-outline"
);

document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

window.addEventListener("mousemove", e => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;
});

// ===============================
// CURSOR HOVER EFFECT
// ===============================
const interactiveElements =
  document.querySelectorAll(
    "a, button, .project-card, .stat-card"
  );

interactiveElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursorOutline.style.transform =
      "translate(-50%, -50%) scale(1.6)";
    cursorOutline.style.borderColor =
      "#ff4d6d";
  });

  el.addEventListener("mouseleave", () => {
    cursorOutline.style.transform =
      "translate(-50%, -50%) scale(1)";
    cursorOutline.style.borderColor =
      "rgba(255, 0, 60, 0.5)";
  });
});

// ===============================
// FLOATING PARALLAX HERO GLOW
// ===============================
const heroBg =
  document.querySelector(".hero-bg");

document.addEventListener(
  "mousemove",
  e => {
    if (heroBg) {
      const moveX =
        (e.clientX / window.innerWidth) * 30;
      const moveY =
        (e.clientY / window.innerHeight) * 30;

      heroBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  }
);

// ===============================
// STATS COUNTER ANIMATION
// ===============================
const counters =
  document.querySelectorAll(".stat-card h3");

const speed = 200;

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target =
        +counter.innerText.replace("+", "")
          .replace("%", "");

      const count =
        +counter.getAttribute(
          "data-count"
        ) || 0;

      const increment =
        target / speed;

      if (count < target) {
        const newCount =
          Math.ceil(
            count + increment
          );

        counter.setAttribute(
          "data-count",
          newCount
        );

        if (
          counter.innerText.includes("%")
        ) {
          counter.innerText =
            newCount + "%";
        } else {
          counter.innerText =
            newCount + "+";
        }

        setTimeout(
          updateCount,
          15
        );
      } else {
        if (
          counter.innerText.includes("%")
        ) {
          counter.innerText =
            target + "%";
        } else {
          counter.innerText =
            target + "+";
        }
      }
    };

    updateCount();
  });
};

// Trigger counters when visible
let statsStarted = false;

window.addEventListener("scroll", () => {
  const statsSection =
    document.querySelector(".stats-grid");

  if (
    statsSection &&
    !statsStarted &&
    window.scrollY >
      statsSection.offsetTop - 500
  ) {
    animateCounters();
    statsStarted = true;
  }
});