export function spacesInsertion(value) {
  let newValue = value
    .replace(/\s/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()

  return newValue
}

export function removeLetters(value) {
  let newValue = value.replace(/\D/g, '')

  return newValue
}

export function removeNumbers(value) {
  let newValue = value.replace(/[^a-zA-Z\s]/g, '').replace('  ', ' ').trimStart()

  return newValue
}

export function barInsertion(value) {
  let newValue = value.trim()

  if (!newValue.includes('/') && newValue.length > 2) {
    newValue = newValue.replace(/(\d{2})/, '$1/')
  }
  else if (newValue.includes('/') && newValue.length == 3) {
    newValue = newValue.replace(/\//, '')
  }

  return newValue
}

export function resetFlag() {
  const $card = document.querySelector('.js-card')

  $card.classList.remove('visa')
  $card.classList.remove('mastercard')
}

export function activeFlag(flag) {
  resetFlag()

  const $card = document.querySelector('.js-card')

  $card.classList.add(flag)
}