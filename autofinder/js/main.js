import { getFavorites, toggleFavorite } from "./storage.js";

// Init
document.addEventListener("DOMContentLoaded", () => {
  wireNav();
  wireModal();
  wireFilters();
  renderVehicles();   // dynamic data
  setLastModified();
  setActiveNav();
});

/* ---------- Data & Rendering ---------- */
let allVehicles = []; // cache for filters

async function fetchVehicles() {
  const res = await fetch("data/vehicles.json");
  if (!res.ok) throw new Error("Failed to fetch vehicle data.");
  return res.json();
}

async function renderVehicles() {
  try {
    if (allVehicles.length === 0) {
      allVehicles = await fetchVehicles();
    }

    const filterValue = document.getElementById("filter-make")?.value?.trim().toLowerCase() || "";
    const favorites = getFavorites();

    const filtered = allVehicles.filter(v =>
      filterValue ? `${v.make} ${v.model}`.toLowerCase().includes(filterValue) : true
    );

    const container = document.getElementById("vehicle-list");
    container.innerHTML = filtered.map(v => {
      const isFav = favorites.includes(Number(v.id));
      return `
        <article class="vehicle-card" data-id="${v.id}">
          <img src="${v.image}" alt="${v.make} ${v.model}" loading="lazy" />
          <h3>${v.make} ${v.model}</h3>
          <p class="vehicle-meta"><strong>Price:</strong> $${Number(v.price).toLocaleString()}</p>
          <p class="vehicle-meta"><strong>Year:</strong> ${v.year}</p>
          <p class="vehicle-meta"><strong>Mileage:</strong> ${Number(v.mileage).toLocaleString()} miles</p>
          <div class="card-actions">
            <button class="btn primary view-details" type="button" data-id="${v.id}">View Details</button>
            <button class="btn fav ${isFav ? "active" : ""}" type="button" data-id="${v.id}" aria-pressed="${isFav}">
              ${isFav ? "★ Favorited" : "☆ Favorite"}
            </button>
          </div>
        </article>
      `;
    }).join("");

    // Attach events (delegation keeps it fast)
    container.addEventListener("click", onCardClick);

  } catch (err) {
    console.error("Error rendering vehicles:", err);
    document.getElementById("vehicle-list").innerHTML = `<p>Unable to load vehicles right now.</p>`;
  }
}

function onCardClick(e) {
  const detailsBtn = e.target.closest(".view-details");
  const favBtn = e.target.closest(".fav");

  if (detailsBtn) {
    const id = Number(detailsBtn.dataset.id);
    const vehicle = allVehicles.find(v => Number(v.id) === id);
    if (vehicle) openModal(vehicle);
  }

  if (favBtn) {
    const id = Number(favBtn.dataset.id);
    toggleFavorite(id);
    // update button state without re-rendering entire list
    const isNowFav = getFavorites().includes(id);
    favBtn.classList.toggle("active", isNowFav);
    favBtn.setAttribute("aria-pressed", String(isNowFav));
    favBtn.textContent = isNowFav ? "★ Favorited" : "☆ Favorite";
  }
}

/* ---------- Modal ---------- */
function wireModal() {
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("modal-close");

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

function openModal(vehicle) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <h3 id="modal-title">${vehicle.make} ${vehicle.model}</h3>
    <p><strong>Price:</strong> $${Number(vehicle.price).toLocaleString()}</p>
    <p><strong>Year:</strong> ${vehicle.year}</p>
    <p><strong>Mileage:</strong> ${Number(vehicle.mileage).toLocaleString()} miles</p>
    <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" loading="lazy" />
  `;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

/* ---------- Navigation / Wayfinding ---------- */
function wireNav() {
  const toggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  toggleBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = {
    "": "index",
    "index.html": "index",
    "about.html": "about",
    "contact.html": "contact"
  };
  const key = map[path] || "index";
  const active = document.querySelector(`a[data-nav="${key}"]`);
  if (active) active.classList.add("active");
}

/* ---------- Filters ---------- */
function wireFilters() {
  const filter = document.getElementById("filter-make");
  const clear = document.getElementById("clear-filters");
  if (!filter || !clear) return;

  const apply = () => renderVehicles();
  filter.addEventListener("input", apply);
  clear.addEventListener("click", () => {
    filter.value = "";
    renderVehicles();
  });
}

/* ---------- Footer meta ---------- */
function setLastModified() {
  const el = document.getElementById("lastModified");
  if (el) el.textContent = document.lastModified;
}
