document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('hamburger-menu');
    const navList = document.querySelector('header nav ul');

    menuButton.addEventListener('click', () => {
        navList.classList.toggle('show');
    });
});