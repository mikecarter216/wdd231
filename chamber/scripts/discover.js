document.addEventListener("DOMContentLoaded", () => {
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  // Convert string to number
  const lastVisitTime = lastVisit ? Number(lastVisit) : null;

  if (!lastVisitTime) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diffDays = Math.floor((now - lastVisitTime) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
  }

  // Store current visit timestamp
  localStorage.setItem("lastVisit", now);

  // Load JSON data and build cards
  fetch("data/discover.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".discover-grid");

      data.discover.forEach((item, index) => {
        const card = document.createElement("section");
        card.classList.add("card");
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          <address>${item.address}</address>
          <button>Learn More</button>
        `;

        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Failed to load JSON data", err));
});