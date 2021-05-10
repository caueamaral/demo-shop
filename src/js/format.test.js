import { spacesInsertion, removeLetters, removeNumbers, barInsertion, resetFlag } from './format'

test('insert spaces between every 4 numbers', () => {
  expect(spacesInsertion('1234123412341234')).toBe('1234 1234 1234 1234')
})

test('remove all the letters, spaces and special characters', () => {
  expect(removeLetters('! 12 text 34 ?')).toBe('1234')
})

test('remove all numbers', () => {
  expect(removeNumbers('1text2')).toBe('text')
})

test('insert bar after 2 numbers and allows up to 4 numbers', () => {
  expect(barInsertion('1234')).toBe('12/34')
})

test('remove visa and mastercard flags', () => {
  document.body.innerHTML = '<div class="card visa js-card">'
  resetFlag()
  expect(document.querySelector('.js-card').classList.contains('visa')).toBeFalsy()

  document.body.innerHTML = '<div class="card mastercard js-card">'
  resetFlag()
  expect(document.querySelector('.js-card').classList.contains('mastercard')).toBeFalsy()
})