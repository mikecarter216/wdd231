const directory = document.getElementById("directory");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// Toggle view buttons
gridBtn.addEventListener("click", () => {
  directory.classList.add("grid-view");
  directory.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list-view");
  directory.classList.remove("grid-view");
});

// Fetch member data
async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Failed to fetch members.json");
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading member data:", error);
    directory.innerHTML = "<p>Error loading member directory. Please try again later.</p>";
  }
}

// Render members
function displayMembers(members) {
  directory.innerHTML = ""; // Clear existing

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    // Handle icon path: if it's a full URL, use it; otherwise assume local file
    const iconPath = member.icon.startsWith("http") ? member.icon : `images/${member.icon}`;

    card.innerHTML = `
      <img src="${iconPath}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
    `;

    directory.appendChild(card);
  });
}

fetchMembers();

// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;