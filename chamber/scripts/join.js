document.addEventListener("DOMContentLoaded", () => {
  // Hamburger toggle
  const toggleBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  // Modal buttons
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const target = btn.getAttribute('data-modal');
    btn.addEventListener('click', () => {
      document.getElementById(target).showModal();
    });
  });

  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('dialog').close();
    });
  });

  // Timestamps
  document.getElementById("timestamp").value = new Date().toISOString();

  // Footer date updates
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
});
