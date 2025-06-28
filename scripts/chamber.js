const toggle = document.getElementById('mode-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

document.getElementById('year').textContent = new Date().getFullYear();

const lastModified = new Date(document.lastModified);
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
};
document.getElementById("lastModified").textContent = lastModified.toLocaleString('en-US', options);

const iconCode = "10d";
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

document.getElementById("weather-icon").src = iconUrl;
document.getElementById("weather-icon").alt = "Partly cloudy";
document.getElementById("weather-text").textContent = `
  75°F – Partly Cloudy
  High: 85° | Low: 52°
  Humidity: 34%
  Sunrise: 7:30am | Sunset: 5:59pm
`;