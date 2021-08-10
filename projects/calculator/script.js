// cached elements ==========
const currentVal = document.getElementById('current-val')
const preview = document.getElementById('preview')
const buttons = [...document.getElementsByClassName('button')]
let history = []

// event listeners ==========
buttons.forEach((button) => button.addEventListener('click', handleClick))

// event handlers ==========
function handleClick(e) {
  const val = String(e.target.innerText).toLowerCase()

  // if it's the start of an equation, only allow numbers
  if (preview.innerText === '') {
    if (/[0-9]/.test(val)) {
      return update(val)
    }
    return
  }

  // proceed based on what type of input has been received
  switch (val) {
    case 'clear':
      clear()
      break
    case 'del':
      undo()
      break
    case '=':
      evaluate()
      break
    default:
      update(val)
      break
  }
}

// helper functions ==========
function update(val) {
  const nextIsOperator = /[^0-9]/.test(val)

  // if the equation has been completed, and the next value is an operator, continue the equation
  if (preview.innerText.includes('=')) {
    if (nextIsOperator) {
      history = [history[history.length - 1].replace(/[^0-9]/g, '')]
    }
    // if the equation has been completed, and the next value is not an operator, start new equation
    else {
      history.length = 0
    }
  }

  if (nextIsOperator && val !== '.') {
    history.push(` ${val} `)
  } else {
    history.push(val)
  }

  currentVal.innerText = val
  preview.innerText = history.join('')
}

function clear() {
  history.length = 0
  currentVal.innerText = '0'
  preview.innerText = ''
}

function undo() {
  history.pop()
  preview.innerText = history.join('')
}

function evaluate() {
  // if the equation ends in a number, evaluate the equation
  if (/[0-9]$/.test(preview.innerText)) {
    // replace x for * and ^ for **
    let formattedEquation = preview.innerText
      .replace(/x/gi, '*')
      .replace(/\^/g, '**')
      .replace(/ \. /g, '.')

    let output = Function(`return(${formattedEquation})`)()

    // if the output is loger than 10 digits, round to 10 digits
    if (String(output).length > 10) {
      output = output.toFixed(10)
    }

    history.push(` = ${output}`)
    currentVal.innerText = output
    preview.innerText = history.join('')

    return
  }

  return
}
