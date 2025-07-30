// Set timestamp
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#timestamp").value = new Date().toISOString();

  // Footer dates
  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelector("#lastModified").textContent = document.lastModified;

  // Modal logic
  const modalButtons = document.querySelectorAll("[data-modal]");
  const closeButtons = document.querySelectorAll(".close");

  modalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.modal;
      document.getElementById(id).showModal();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest("dialog").close();
    });
  });
});