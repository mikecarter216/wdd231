// Set the last modified date in the footer
document.addEventListener("DOMContentLoaded", () => {
  const lastModified = document.lastModified;
  document.getElementById("lastModified").textContent = lastModified;
});