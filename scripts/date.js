// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Format and display last modified date and time
const lastModified = new Date(document.lastModified);
const formattedDate = lastModified.toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});

document.getElementById("lastModified").textContent = `Last Modification: ${formattedDate}`;
