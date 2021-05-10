import { spacesInsertion, removeLetters, removeNumbers, barInsertion, resetFlag, activeFlag } from './format'

test('add spaces between every 4 numbers', () => {
  expect(spacesInsertion('1234123412341234')).toBe('1234 1234 1234 1234')
})

test('remove all the letters, spaces and special characters', () => {
  expect(removeLetters('! 12 text 34 ?')).toBe('1234')
})

test('remove all numbers', () => {
  expect(removeNumbers('1text2')).toBe('text')
})

test('add bar after 2 numbers and allows up to 4 numbers', () => {
  expect(barInsertion('1234')).toBe('12/34')
})

test('remove visa and mastercard classes', () => {
  document.body.innerHTML = '<div class="card visa js-card">'
  resetFlag()
  expect(document.querySelector('.js-card').classList.contains('visa')).toBeFalsy()

  document.body.innerHTML = '<div class="card mastercard js-card">'
  resetFlag()
  expect(document.querySelector('.js-card').classList.contains('mastercard')).toBeFalsy()
})

test('add visa flag class', () => {
  document.body.innerHTML = '<div class="card js-card"></div>'
  activeFlag('visa')
  expect(document.querySelector('.js-card').classList.contains('visa')).toBeTruthy()
})