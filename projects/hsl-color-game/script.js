// cached elements ==========
const navbar = document.getElementById('navbar')
const navigation = [...document.getElementsByClassName('nav-link')].map(
  (link) =>
    (link = {
      link: link,
      section: document.getElementById(link.hash.slice(1)),
    }),
)

// event listeners ==========
navigation.forEach((item) =>
  item.link.addEventListener('click', handleNavigation),
)

// event handlers ==========
function handleNavigation(e) {
  navigation.forEach((item) => {
    if (item.section.id === e.target.hash.slice(1)) {
      item.link.classList.add('nav-link-active')
      item.section.classList.remove('display-none')
      return
    } else {
      item.link.classList.remove('nav-link-active')
      item.section.classList.add('display-none')
      return
    }
  })
}
