document.addEventListener("DOMContentLoaded", () => {
  // ✅ Hamburger toggle (fixed)
  const hamburger = document.getElementById('hamburger');
  const navList = document.querySelector('nav ul');

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      navList.classList.toggle("open");
    });
  }

  // ✅ Modal buttons
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

  // ✅ Timestamps
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  // ✅ Footer date updates
  const yearEl = document.getElementById("year");
  const modifiedEl = document.getElementById("lastModified");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modifiedEl) modifiedEl.textContent = document.lastModified;
});
