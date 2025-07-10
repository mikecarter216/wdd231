// === MEMBER SPOTLIGHT === //
async function getSpotlightMembers() {
  try {
    const response = await fetch("data/member.json");
    if (!response.ok) throw new Error("Failed to fetch member.json");

    const data = await response.json();

    const spotlightMembers = data.members.filter(
      member => member.membership === "Gold" || member.membership === "Silver"
    );

    const selected = spotlightMembers
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("business-card");

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy"
             onerror="this.src='images/fallback.jpg';">
        <h3>${member.name}</h3>
        <p class="tagline">${member.tagline}</p>
        <p><strong>Email:</strong> ${member.email}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Spotlight Error:", error.message);
  }
}

getSpotlightMembers();


// === MOCK WEATHER DISPLAY === //
function fetchWeather() {
  const icon = "images/weather.png";
  const description = "Partly Cloudy";
  const temp = 30;

  const iconEl = document.getElementById("weather-icon");
  const textEl = document.getElementById("weather-text");

  if (iconEl && textEl) {
    iconEl.src = icon;
    iconEl.alt = description;
    textEl.textContent = `${description}, ${temp}°C`;
  } else {
    console.warn("Weather elements not found in the HTML.");
  }
}

fetchWeather();