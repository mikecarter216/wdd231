document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-button");
  const nav = document.getElementById("main-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
