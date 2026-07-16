// ===== Menu Toggle =====
const toggle = document.querySelector('.menu-toggle')
const menu = document.querySelector('.header-menu')

toggle.addEventListener('click', () => {
  menu.classList.toggle('open')
})