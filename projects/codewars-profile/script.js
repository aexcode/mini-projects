const baseURL = `https://www.codewars.com/api/v1/users/`
const username = `aexcode`

async function getData() {
  displayData(await fetch(baseURL + username).then((res) => res.json()))
}

function displayData(data) {
  document.querySelector('#username').textContent = data.username
  document.querySelector('#display-name').textContent = data.name
  const codewarsLinks = [...document.querySelectorAll('.codewars-link')]
  codewarsLinks.forEach(
    (link) => (link.href = `https://codewars.com/users/${username}`),
  )
}

getData()
