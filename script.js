const words = ["self", "skills", "future"];
let wordIndex = 0;
let charIndex = 0;

function typeEffect() {

  if (charIndex < words[wordIndex].length) {

    document.getElementById("type").textContent +=
      words[wordIndex].charAt(charIndex);

    charIndex++;

    setTimeout(typeEffect, 150);

  } else {

    setTimeout(eraseEffect, 1200);
  }
}

function eraseEffect() {

  if (charIndex > 0) {

    document.getElementById("type").textContent =
      words[wordIndex].substring(0, charIndex - 1);

    charIndex--;

    setTimeout(eraseEffect, 80);

  } else {

    wordIndex++;

    if (wordIndex >= words.length) {
      wordIndex = 0;
    }

    setTimeout(typeEffect, 300);
  }
}

typeEffect();
gsap.registerPlugin(ScrollTrigger);

/* 🔥 reusable logic */




gsap.registerPlugin(ScrollTrigger);

/* EACH SECTION LOOP (REUSABLE) */
document.querySelectorAll(".h-scroll").forEach((section) => {

  const inner = section.querySelector(".h-inner");
  const panels = section.querySelectorAll(".h-panel");
  const bars = section.querySelectorAll(".h-progress span");

  // IMPORTANT: calculate real width
  let totalWidth = 0;
  panels.forEach(panel => {
    totalWidth += panel.offsetWidth;
  });

  // horizontal animation
  const tween = gsap.to(inner, {
    x: () => -(totalWidth - window.innerWidth),
    ease: "none"
  });

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + (totalWidth - window.innerWidth),
    pin: true,
    scrub: 1,
    animation: tween,
    invalidateOnRefresh: true,

    onUpdate: (self) => {
      let index = Math.round(self.progress * (panels.length - 1));

      bars.forEach(b => b.classList.remove("active"));
      if (bars[index]) bars[index].classList.add("active");
    }
  });

});

/* resize fix */
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});


const contactBtn = document.querySelector('a[href="#contact"]');
const overlay = document.getElementById('contactOverlay');
const closeBtn = document.getElementById('contactClose');

/* open */
contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.classList.add('active');
});

/* close button */
closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active');
});

/* click outside */
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});

/* ESC key */
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    overlay.classList.remove('active');
  }
});

