export async function loadVehicles() {
  try {
    const res = await fetch("data/vehicles.json");
    const vehicles = await res.json();
    const container = document.getElementById("vehicle-list");
    container.innerHTML = ""; // Clear old content

    vehicles.forEach(v => {
      container.innerHTML += `
        <div class="vehicle-card">
          <img src="${v.image}" alt="${v.make} ${v.model}" loading="lazy">
          <h3>${v.make} ${v.model}</h3>
          <p>Price: $${v.price.toLocaleString()}</p>
          <p>Year: ${v.year}</p>
          <p>Mileage: ${v.mileage.toLocaleString()} miles</p>
          <button class="view-details" data-vehicle='${JSON.stringify(v)}'>View Details</button>
        </div>
      `;
    });

    document.querySelectorAll(".view-details").forEach(btn => {
      btn.addEventListener("click", e => {
        const vehicle = JSON.parse(e.target.dataset.vehicle);
        openModal(vehicle);
      });
    });
  } catch (err) {
    console.error("Error loading vehicles", err);
  }
}

function openModal(vehicle) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <h3>${vehicle.make} ${vehicle.model}</h3>
    <p>Price: $${vehicle.price.toLocaleString()}</p>
    <p>Year: ${vehicle.year}</p>
    <p>Mileage: ${vehicle.mileage.toLocaleString()} miles</p>
    <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
  `;
  modal.classList.remove("hidden");
}

// Close modal
document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

loadVehicles();