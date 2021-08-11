// cached elements ==========
const navbar = document.getElementById('navbar')
const navigation = [...document.getElementsByClassName('nav-link')].map(
  (link) =>
    (link = {
      link: link,
      section: document.getElementById(link.hash.slice(1)),
    }),
)
const prompt = document.getElementById('prompt')
const colors = [...document.getElementsByClassName('color')]
const fillColors = []

// event listeners ==========
navigation.forEach(({ link }) =>
  link.addEventListener('click', handleNavigation),
)
colors.forEach((color) => color.addEventListener('click', handleGuess))

// event handlers ==========
function handleNavigation(e) {
  navigation.forEach((item) => {
    if (item.section.id === e.target.hash.slice(1)) {
      item.link.classList.add('nav-link-active')
      item.section.classList.remove('display-none')
      if (item.section.id === 'game') startGame()
      return
    } else {
      item.link.classList.remove('nav-link-active')
      item.section.classList.add('display-none')
      return
    }
  })
}

function handleGuess(e) {
  colors.forEach((color) => {
    color.style.pointerEvents = 'none'

    if (color.style.backgroundColor !== prompt.innerText) {
      color.innerHTML = `<i class='bx bx-x-circle' ></i>`
      color.style.color = color.style.backgroundColor
      color.style.backgroundColor = 'unset'
    }
  })

  if (e.target.style.backgroundColor === prompt.innerText) {
    alertWinner()
  } else {
    alertLoser()
  }
}

// helper functions ==========
function generateColor() {
  const randomVal = () => Math.floor(Math.random() * 255)
  return `rgb(${randomVal()}, ${randomVal()}, ${randomVal()})`
}

function generateFillColors() {
  fillColors.length = 0
  colors.forEach((color) => {
    color.innerHTML = ''
    fillColors.push(generateColor())
  })
}

function displayColors() {
  prompt.innerText = fillColors[Math.floor(Math.random() * fillColors.length)]

  colors.forEach((color, i) => {
    color.style.pointerEvents = 'auto'
    color.style.backgroundColor = fillColors[i]
  })
}

function alertWinner() {
  prompt.innerText = 'Winner, Winner!'
  setTimeout(startGame, 3000)
}

function alertLoser() {
  prompt.innerText = 'Better luck next time...'
  setTimeout(startGame, 3000)
}

function startGame() {
  generateFillColors()
  displayColors()
}

// on load ==========
startGame()
