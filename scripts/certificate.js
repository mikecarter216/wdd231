// Sample course data
const courses = [
  { code: "WDD 130", title: "Web Fundamentals", type: "WDD", credits: 3, completed: true },
  { code: "WDD 131", title: "Responsive Design", type: "WDD", credits: 3, completed: true },
  { code: "ITM 111", title: "Introduction to Databases", type: "WDD", credits: 3, completed: true },
  { code: "CSE 210", title: "Programming with Classes", type: "CSE", credits: 3, completed: true },
  { code: "CSE 110", title: "Programming with Function", type: "CSE", credits: 2, completed: true }
];

// DOM Elements
const grid = document.querySelector('.certificate-grid');
const allBtn = document.querySelector('.all-btn');
const cseBtn = document.querySelector('.cse-btn');
const wddBtn = document.querySelector('.wdd-btn');
const creditDisplay = document.getElementById('creditTotal'); // NEW

// Render courses
function renderCourses(filteredCourses) {
  grid.innerHTML = ''; // Clear grid

  filteredCourses.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('certificate-card');
    if (course.completed) card.classList.add('completed');

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
      ${course.completed ? '<p class="badge">✓ Completed</p>' : ''}
    `;
    grid.appendChild(card);
  });

  // Calculate total credits using reduce()
  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  creditDisplay.textContent = totalCredits;
}

// Event listeners for filter buttons
allBtn.addEventListener('click', () => renderCourses(courses));
cseBtn.addEventListener('click', () => renderCourses(courses.filter(course => course.type === 'CSE')));
wddBtn.addEventListener('click', () => renderCourses(courses.filter(course => course.type === 'WDD')));

// Initial load
renderCourses(courses);
