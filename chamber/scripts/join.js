document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const nav = document.querySelector("header nav");

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
});