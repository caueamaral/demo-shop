import { spacesInsertion } from './format.js'
import { removeLetters   } from './format.js'
import { removeNumbers   } from './format.js'
import { barInsertion    } from './format.js'

export function fillCard() {
  const $fields = document.querySelectorAll('.js-card-data-bind')

  $fields.forEach($field => {
    $field.addEventListener('input', () => format(event))
    $field.addEventListener('input', () => fill(event))
  })
}

export function trimCard() {
  const $fieldName = document.querySelector('.js-card-field-name')

  $fieldName.addEventListener('blur', () => {
    event.target.value = event.target.value.trim()
  })
}

export function flipCard() {
  const $card     = document.querySelector('.js-card')
  const $fieldCVV = document.querySelector('.js-card-field-cvv')

  const activeFlip   = () => $card.classList.add('flip')
  const InactiveFlip = () => $card.classList.remove('flip')

  $fieldCVV.addEventListener('focus', activeFlip)
  $fieldCVV.addEventListener('blur',  InactiveFlip)
}

export function format() {
  const target              = event.target.dataset.bind
  const value               = event.target.value
  const valueWithoutLetters = removeLetters(value)
  let newValue              = ''

  switch(target) {
    case 'number':
      newValue = spacesInsertion(valueWithoutLetters)
    break
    case 'name':
      newValue = removeNumbers(value)
    break
    case 'validity':
      newValue = barInsertion(valueWithoutLetters)
    break
    case 'cvv':
      newValue = valueWithoutLetters
    break
  }

  if (target != 'installments') {
    event.target.value = newValue
  }
}

export function fill() {
  const target  = event.target.dataset.bind
  const $target = document.querySelector(`.js-card-data-bind-target[data-bind=${target}]`)
  const value   = event.target.value
  let newValue  = ''

  switch(target) {
    case 'number':
      newValue = spacesInsertion(value)
    break
    case 'validity':
      newValue = barInsertion(value)
    break
    case 'name':
      newValue = value
    break
    case 'cvv':
      newValue = value
    break
    case 'installments':
      return
    break
  }

  $target.textContent = newValue

  if (!$target.textContent) {

    if (target == 'number') {
      $target.innerHTML = `<span class="card-front-numbers-interno">${$target.getAttribute('placeholder')}</span>`
    }
    else if (target == 'cvv') {
      $target.innerHTML = `<span class="card-back-cvv-interno">${$target.getAttribute('placeholder')}</span>`
    }
    else {
      $target.textContent = $target.getAttribute('placeholder')
    }
  }
}