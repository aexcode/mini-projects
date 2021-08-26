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

function replaceLinks() {
  const codewarsLinks = [...document.querySelectorAll('.link-codewars')]
  codewarsLinks.forEach(
    (link) => (link.href = `https://codewars.com/users/${username}`),
  )
}

function displayHeaderData(data) {
  document.querySelector('#username').textContent = data.username
  document.querySelector('#display-name').textContent = data.displayName
}

function displayProgressData(data) {
  const progressStatsDisplay = document.querySelector('.stats')
  progressStatsDisplay.innerHTML = `
		<div>
			<div class="stat"><span class="bold">Rank:</span>	${data.rank}</div>
			<div class="stat"><span class="bold">Honor:</span>	${data.honor}</div>
			<div class="stat"><span class="bold">Leaderboard Position:</span>	${data.leaderboardPosition}</div>
			<div class="stat"><span class="bold">Last Seen:</span>	${data.lastSeen}</div>
			</div>
			<div>
			<div class="stat"><span class="bold">Total Completed Kata:</span>	${data.totalCompletedKata}</div>
			<div class="stat"><span class="bold">Total Languages Trained:</span>	${data.totalLanguagesTrained}</div>
			<div class="stat"><span class="bold">Highest Trained:</span>	<i class="devicon-${data.highestTrained}-plain"></i> ${data.highestTrained}</div>
			<div class="stat"><span class="bold">Most Recent:</span>	<i class="devicon-${data.mostRecent}-plain"></i> ${data.mostRecent}</div>
		</div>
	`
  console.log(
    data.rank,
    data.honor,
    data.leaderboardPosition,
    data.totalCompletedKata,
    data.lastSeen,
    data.totalLanguagesTrained,
    data.highestTrained,
    data.mostRecent,
  )
}

function displayLanguageCards({ languages }) {
  const languageDisplay = document.querySelector('#languages')

  languages.forEach((language) => {
    const languageCard = document.createElement('li')
    languageCard.classList.add('language-card')
    languageCard.innerHTML = `
  		<div class="language-icon">
    		<i class="h1 devicon-${language.language}-plain"></i>
    		<p>${language.language}</p>
  			<small><span class="bold">Rank:</span> ${language.name}</small><br />
  			<small><span class="bold">Score:</span> ${language.score}</small>
    	</div>
  	`
    languageDisplay.append(languageCard)
  })
}

function displayRecentSolves({ recentSolves }) {
  const completedChallengesDisplay = document.querySelector('#recent-solves')

  // create card for each challenge
  recentSolves.forEach((challenge) => {
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

async function getData() {
  const userData = await fetch(userLanguageUrl).then((res) => res.json())
  const completedData = await fetch(completedChallengesUrl).then((res) =>
    res.json(),
  )

  return {
    username: userData.username,
    displayName: userData.name,
    rank: userData.ranks.overall.name,
    honor: userData.honor,
    leaderboardPosition: userData.leaderboardPosition,
    totalCompletedKata: userData.codeChallenges.totalCompleted,
    highestTrained: Object.keys(userData.ranks.languages)[0],
    totalLanguagesTrained: Object.keys(userData.ranks.languages).length,
    mostRecent: completedData.data[0].completedLanguages[0],
    lastSeen: formatDate(completedData.data[0].completedAt),
    languages: [...Object.keys(userData.ranks.languages)].map(
      (name) => (name = { language: name, ...userData.ranks.languages[name] }),
    ),
    recentSolves: completedData.data.slice(0, 5),
  }
}

async function init() {
  const data = await getData()

  replaceLinks()
  displayHeaderData(data)
  displayProgressData(data)
  displayLanguageCards(data)
  displayRecentSolves(data)
}

init()
