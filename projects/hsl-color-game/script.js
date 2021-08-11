// cached elements ==========
const navbar = document.getElementById('navbar')
const navLinks = [...navbar.children]
const sections = [...document.getElementsByTagName('section')]

// event listeners ==========
navLinks.forEach((link) => link.addEventListener('click', handleNavigation))

// event handlers ==========
function handleNavigation(e) {
  sections.forEach((section) => {
    if (section.id === e.target.innerText.toLowerCase()) {
      return section.classList.remove('display-none')
    } else return section.classList.add('display-none')
  })
}
