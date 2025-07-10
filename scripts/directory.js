// directory.js (now inlined in HTML, but here's the separate file version)

const directory = document.getElementById("directory");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
const modeToggle = document.getElementById("mode-toggle");

gridBtn.addEventListener("click", () => {
  directory.classList.add("grid-view");
  directory.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list-view");
  directory.classList.remove("grid-view");
});

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

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

function displayMembers(members) {
  directory.innerHTML = "";

  members.forEach(member => {
    const section = document.createElement("section");
    section.classList.add("card", "member");

    const iconPath = member.icon.startsWith("http") ? member.icon : `images/${member.icon}`;

    section.innerHTML = `
      <img src="${iconPath}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>
    `;

    directory.appendChild(section);
  });
}

fetchMembers();

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;