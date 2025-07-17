export function openModal(vehicle) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  modal.classList.remove('hidden');
  body.innerHTML = `
    <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
    <img src="${vehicle.image}" alt="${vehicle.make}" />
    <p>Price: $${vehicle.price.toLocaleString()}</p>
    <p>Mileage: ${vehicle.mileage.toLocaleString()} miles</p>
  `;

  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.add('hidden');
  });
}
