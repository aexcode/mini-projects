const username = `aexcode`
const userLanguageUrl = `https://www.codewars.com/api/v1/users/${username}`
const completedChallengesUrl = `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=0`

function formatDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const newDate = new Date(date)

  return `${
    months[newDate.getMonth()]
  } ${newDate.getDate()}, ${newDate.getFullYear()}`
}

async function init() {
  const userLanguageData = await fetch(userLanguageUrl).then((res) =>
    res.json(),
  )
  const recentSolvesData = await fetch(completedChallengesUrl).then((res) =>
    res.json(),
  )

  replaceLinks()
  displayUserData(userLanguageData)
  displayLanguageData(userLanguageData)
  displayRecentSolves(recentSolvesData)
}

function displayUserData(data) {
  // header data
  document.querySelector('#username').textContent = data.username
  document.querySelector('#display-name').textContent = data.name

  console.log(data)
}

function replaceLinks() {
  // codewars profile links
  const codewarsLinks = [...document.querySelectorAll('.link-codewars')]
  codewarsLinks.forEach(
    (link) => (link.href = `https://codewars.com/users/${username}`),
  )
}

function displayLanguageData(data) {
  // language cards
  const languageDisplay = document.querySelector('#languages')
  const languages = [...Object.keys(data.ranks.languages)].map(
    (name) => (name = { language: name, ...data.ranks.languages[name] }),
  )

  languages.forEach((language) => {
    const languageCard = document.createElement('li')
    languageCard.classList.add('language-card')
    languageCard.innerHTML = `
  		<div class="language-icon">
    		<i class="h1 devicon-${language.language}-plain"></i>
    		<p>${language.language}</p>
  			<small>Rank: ${language.name}</small><br />
  			<small>Score: ${language.score}</small>
    	</div>
  	`
    languageDisplay.append(languageCard)
  })
}

function displayRecentSolves({ totalItems, data }) {
  const completedChallengesDisplay = document.querySelector('#recent-solves')
  const challenges = data.slice(0, 5)

  // create card for each challenge
  challenges.forEach((challenge) => {
    const challengeCard = document.createElement('li')

    // add challenge name, link, and completedAt date to card
    challengeCard.innerHTML = `
		<a href="https://www.codewars.com/kata/${challenge.slug}">
  		${challenge.name}
  	</a>
  	<small>${formatDate(challenge.completedAt)}</small>
		`
    // add completed languages to card
    const completedLanguages = document.createElement('ul')
    challenge.completedLanguages.forEach((language) => {
      const completedLanguageCard = document.createElement('li')
      completedLanguageCard.innerHTML = `
				<span>
					<i class="devicon-${language}-plain"></i>
    			${language}
				</span>
		`
      completedLanguages.append(completedLanguageCard)
    })
    challengeCard.append(completedLanguages)

    // add challenge card to display
    completedChallengesDisplay.append(challengeCard)
  })
}

init()
