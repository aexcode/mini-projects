// cached elements ==========
const navbar = document.getElementById('navbar')
const navigation = [...document.getElementsByClassName('nav-link')].map(
  (link) =>
    (link = {
      link: link,
      section: document.getElementById(link.hash.slice(1)),
    }),
)
const rgb = document.getElementById('rgb')
const colors = [...document.getElementsByClassName('color')]
const fillColors = []

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
      if (item.section.id === 'game') generateColors()
      return
    } else {
      item.link.classList.remove('nav-link-active')
      item.section.classList.add('display-none')
      return
    }
  })
}

// helper functions ==========
function generateColor() {
  const randomVal = () => Math.floor(Math.random() * 255)
  return `rgb(${randomVal()}, ${randomVal()}, ${randomVal()})`
}

function generateFillColors() {
  fillColors.length = 0
  colors.forEach((color) => fillColors.push(generateColor()))
}

function displayColors() {
  rgb.innerText = fillColors[Math.floor(Math.random() * fillColors.length)]

  colors.forEach((color, i) => {
    color.style.backgroundColor = fillColors[i]
  })
}

// on load ==========
generateFillColors()
displayColors()
