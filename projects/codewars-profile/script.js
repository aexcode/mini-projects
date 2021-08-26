const baseURL = `https://www.codewars.com/api/v1/users/`
const username = `aexcode`

function createDevicon(id) {
  return `<i class="devicon-${id}-original"></i>`
}

async function getData() {
  displayData(await fetch(baseURL + username).then((res) => res.json()))
}

function displayData(data) {
  // header data
  document.querySelector('#username').textContent = data.username
  document.querySelector('#display-name').textContent = data.name

  // codewars profile links
  const codewarsLinks = [...document.querySelectorAll('.codewars-link')]
  codewarsLinks.forEach(
    (link) => (link.href = `https://codewars.com/users/${username}`),
  )

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

getData()
