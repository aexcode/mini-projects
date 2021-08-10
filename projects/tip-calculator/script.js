// cached elements ==========
const form = document.getElementById('form')
const totalBill = document.getElementById('bill')
const totalPeople = document.getElementById('people')
const tipPercentage = document.getElementById('percentage')
const output = document.getElementById('output')

// event listeners ==========
form.addEventListener('change', calculateTip)

// event handlers ==========
function calculateTip() {
  const dollarsPerPerson = (
    (totalBill.value * (tipPercentage.value / 100)) /
    totalPeople.value
  ).toFixed(2)

  displayTip(`$${dollarsPerPerson}`)
}

// helper functions ==========
function displayTip(totalPerPerson) {
  console.log(totalPerPerson)
  output.innerText = `Each person should tip ${totalPerPerson}`
}
