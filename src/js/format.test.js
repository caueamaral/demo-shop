import { spacesInsertion } from './format'

test('insert spaces between every 4 numbers', () => {
  expect(spacesInsertion('1234123412341234')).toBe('1234 1234 1234 1234')
})