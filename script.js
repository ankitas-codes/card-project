// ==============================
// FAQ SECTION
// ==============================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// ==============================
// DARK MODE
// ==============================

const themeButton = document.getElementById("themeButton");
const maincardbottom = document.querySelector(".main_card_bottom");
const maincardtop = document.querySelector(".main_card_top");

themeButton.addEventListener("click", () => {
  maincardbottom.classList.toggle("dark");
  maincardtop.classList.toggle("dark");

  if (maincardbottom.classList.contains("dark")) {
    themeButton.textContent = "☀️ Light Mode";
  } else {
    themeButton.textContent = "🌙 Dark Mode";
  }
});

// ==============================
// PROFILE CARD SLIDER
// ==============================

// PROFILE CARD SLIDER

const cardSection = document.getElementById("cardSection");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderDots = document.getElementById("sliderDots");

const cards = document.querySelectorAll(".card_container");

let currentIndex = 0;

// Number of visible cards
function getVisibleCards() {
  return window.innerWidth <= 600 ? 1 : 2;
}

// Update slider
function updateSlider() {
  const visibleCards = getVisibleCards();

  const totalPages = Math.ceil(cards.length / visibleCards);

  currentIndex = Math.min(currentIndex, totalPages - 1);

  const cardWidth = cards[0].offsetWidth;
  const gap = 12;

  const moveDistance = visibleCards * (cardWidth + gap);

  cardSection.style.transform = `translateX(-${currentIndex * moveDistance}px)`;

  // Update dots
  sliderDots.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("button");

    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

    if (i === currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });

    sliderDots.appendChild(dot);
  }

  // Arrow controls
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === totalPages - 1;
}

// Next arrow
nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(cards.length / getVisibleCards());

  if (currentIndex < totalPages - 1) {
    currentIndex++;
    updateSlider();
  }
});

// Previous arrow
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Responsive resize
window.addEventListener("resize", updateSlider);

// Initial setup
updateSlider();
