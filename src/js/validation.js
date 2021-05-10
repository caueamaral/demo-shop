import { resetFlag, activeFlag  } from './format.js'

export function validatorCardFields() {
  const $fields = document.querySelectorAll('.js-card-data-bind')

  $fields.forEach($field => $field.addEventListener('input', () => validator(event)))
}

export function validator(value) {
  const target = event.target.dataset.bind

  switch(target) {
    case 'number':
      numberValidator()
    break
    case 'name':
      nameValidator()
    break
    case 'validity':
      validityValidator()
    break
    case 'cvv':
      CVVValidator()
    break
    case 'installments':
      installmentsValidator()
    break
  }
}

export function numberValidator() {
  const $number = document.querySelector('.js-form-field-number')
  const $group  = $number.closest('.js-form-group')

  if ($number.value.length == 19) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

export function nameValidator() {
  const $name      = document.querySelector('.js-form-field-name')
  const $group     = $name.closest('.js-form-group')
  const expression = /^[a-zA-z]{2,} [a-zA-Z]{2,}$/

  if (expression.test($name.value)) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

export function validityValidator() {
  const $validity = document.querySelector('.js-form-field-validity')
  const $group    = $validity.closest('.js-form-group')

  if ($validity.value.length == 5) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

export function CVVValidator() {
  const $cvv   = document.querySelector('.js-form-field-cvv')
  const $group = $cvv.closest('.js-form-group')

  if ($cvv.value.length > 2) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

export function installmentsValidator() {
  const $installments = document.querySelector('.js-form-selection-installments')
  const $group        = $installments.closest('.js-form-group')

  if ($installments.value) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

export function validatorCardSend() {
  const $button = document.querySelector('.js-form-button')

  $button.addEventListener('click', () => {
    event.preventDefault()

    numberValidator()
    nameValidator()
    validityValidator()
    CVVValidator()
    installmentsValidator()
  })
}

export function flagsCard() {
  const $numbers = document.querySelector('.js-form-field-number')

  $numbers.addEventListener('input', () => {
    flagValidation()
  })
}

export function flagValidation() {
  let value     = event.target.value
  let foundFlag = ''

  if (value.length < 2) {
    return resetFlag()
  }
  
  testFlag('visa',       ['4'])
  testFlag('mastercard', ['51', '52', '53', '54', '55'])

  if (foundFlag) {
    activeFlag(foundFlag)
  }

  function testFlag(flag, numbers) {

    numbers.forEach(number => {

      if (value.startsWith(number)) {
        return foundFlag = flag
      }
    })
  }
}