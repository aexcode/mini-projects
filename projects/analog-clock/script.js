// digital elements ==========
const digitalDisplay = document.querySelector('.digital')

// analog elements ==========
const hourHand = document.querySelector('.hour-hand')
const minuteHand = document.querySelector('.minute-hand')
const secondHand = document.querySelector('.second-hand')

// set digital clock ==========
const setTimeDigital = () => {
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

  const date = new Date()
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hour24 = date.getHours()
  const hour12 = hour24 < 13 ? hour24 : hour24 - 12
  const amPm = hour24 < 12 ? 'am' : 'pm'
  const seconds = date.getSeconds()
  const minutes = date
    .getMinutes()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

  digitalDisplay.innerText = `${month} ${day}, ${year} ${hour12}:${minutes} ${amPm.toUpperCase()}`
}

setTimeDigital()
setInterval(setTimeDigital, 1000)

// set analog clock ==========
const setTimeAnalog = () => {
  const time = new Date()
  minuteHand.style.transform = 'rotate(' + time.getMinutes() * 6 + 'deg)'
  secondHand.style.transform = 'rotate(' + time.getSeconds() * 6 + 'deg)'
  hourHand.style.transform =
    'rotate(' +
    (time.getHours() * 30 + Math.floor(time.getMinutes() / 12) * 6) +
    'deg)'
}

setTimeAnalog()
setInterval(setTimeAnalog, 1000)
