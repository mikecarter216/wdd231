import { openModal } from './modal.js';

const container = document.querySelector('#vehicle-list');

async function loadVehicles() {
  try {
    const res = await fetch('data/vehicles.json');
    if (!res.ok) throw new Error('Failed to load vehicle data');
    const vehicles = await res.json();
    displayVehicles(vehicles);
  } catch (err) {
    container.innerHTML = `<p class="error">${err.message}</p>`;
  }
}

function displayVehicles(data) {
  container.innerHTML = '';
  data.forEach(vehicle => {
    const card = document.createElement('div');
    card.className = 'vehicle-card';
    card.innerHTML = `
      <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" loading="lazy" />
      <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
      <p>Price: $${vehicle.price.toLocaleString()}</p>
      <p>Mileage: ${vehicle.mileage.toLocaleString()} miles</p>
      <button data-id="${vehicle.id}">More Info</button>
    `;
    card.querySelector('button').addEventListener('click', () => openModal(vehicle));
    container.appendChild(card);
  });
}

loadVehicles();
