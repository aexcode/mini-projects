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
const scoreDisplay = document.getElementById('score')
const currentStreakDisplay = document.getElementById('current-streak')
const longestStreakDisplay = document.getElementById('longest-streak')
const resetStatsBtn = document.getElementById('reset-stats')

// event listeners ==========
navigation.forEach(({ link }) =>
  link.addEventListener('click', handleNavigation),
)
colors.forEach((color) => color.addEventListener('click', handleGuess))
resetStatsBtn.addEventListener('click', resetStats)

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

    // show visual feedback
    if (color.style.backgroundColor !== prompt.innerText) {
      color.innerHTML = `<i class='bx bx-x-circle' ></i>`
      color.style.color = color.style.backgroundColor
      color.style.backgroundColor = 'unset'
    }
  })

  // update score
  updateScore(e.target.style.backgroundColor === prompt.innerText)

  // save stats to local storage
  localStorage.setItem('aexColorGameStats', JSON.stringify(stats))

  // reset game
  setTimeout(startGame, 2000)
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

function updateScore(playerHasWon) {
  if (playerHasWon) {
    // win State
    stats.score++
    stats.currentStreak++
    if (stats.currentStreak > stats.longestStreak) {
      stats.longestStreak = stats.currentStreak
      prompt.innerText = 'Winner, Winner!'
    }
  } else {
    // lose State
    stats.score >= 1 ? stats.score-- : (stats.score = 0)
    stats.currentStreak = 0
    prompt.innerText = 'Better luck next time...'
  }

  displayStats()
}

function displayStats() {
  scoreDisplay.innerText = stats.score
  currentStreakDisplay.innerText = stats.currentStreak
  longestStreakDisplay.innerText = stats.longestStreak
}

function resetStats() {
  stats.score = 0
  stats.currentStreak = 0
  stats.longestStreak = 0
  localStorage.removeItem('aexColorGameStats')
  displayStats()
}

function startGame() {
  generateFillColors()
  displayColors()
}

// on load ==========
displayStats()
startGame()
