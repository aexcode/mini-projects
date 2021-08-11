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
const stats = JSON.parse(localStorage.getItem('aexColorGameStats')) || {
  score: 0,
  currentStreak: 0,
  longestStreak: 0,
}

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
  // update stats
  stats.score++
  stats.currentStreak++
  if (stats.currentStreak > stats.longestStreak) {
    stats.longestStreak = stats.currentStreak
  }

  // save stats to local storage
  localStorage.setItem('aexColorGameStats', JSON.stringify(stats))

  prompt.innerText = 'Winner, Winner!'
  setTimeout(startGame, 2000)
}

function alertLoser() {
  // update stats
  stats.score >= 1 ? stats.score-- : (stats.score = 0)
  stats.currentStreak = 0

  // save stats to local storage
  localStorage.setItem('aexColorGameStats', JSON.stringify(stats))

  prompt.innerText = 'Better luck next time...'
  setTimeout(startGame, 2000)
}

function startGame() {
  generateFillColors()
  displayColors()
}

// on load ==========
startGame()
// localStorage.clear()
