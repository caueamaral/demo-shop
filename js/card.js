;(() => {
  const fillCard = () => {
    const $fields = document.querySelectorAll('.js-card-data-bind')

    $fields.forEach($field => {
      $field.addEventListener('input', () => format(event))
      $field.addEventListener('input', () => fill(event))
    })
  }

  const trimCard = () => {
    const $fieldName = document.querySelector('.js-card-field-name')

    $fieldName.addEventListener('blur', () => {
      event.target.value = event.target.value.trim()
    })
  }

  const flipCard = () => {
    const $card     = document.querySelector('.js-card')
    const $fieldCVV = document.querySelector('.js-card-field-cvv')

    const activeFlip   = () => $card.classList.add('flip')
    const InactiveFlip = () => $card.classList.remove('flip')

    $fieldCVV.addEventListener('focus', activeFlip)
    $fieldCVV.addEventListener('blur',  InactiveFlip)
  }

  const validatorCardFields = () => {
    const $fields = document.querySelectorAll('.js-card-data-bind')

    $fields.forEach($field => $field.addEventListener('input', () => validator(event)))
  }

  const validatorCardSend = () => {
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

  const flagsCard = () => {
    const $numbers = document.querySelector('.js-form-field-number')

    $numbers.addEventListener('input', () => {
      flagValidation()
    })
  }

  fillCard()
  trimCard()
  flipCard()
  validatorCardFields()
  validatorCardSend()
  flagsCard()
})()

const format = () => {
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

const fill = () => {
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

const spacesInsertion = value => {
  let newValue = value
    .replace(/\s/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()

  return newValue
}

const removeLetters = value => {
  let newValue = value.replace(/\D/g, '')

  return newValue
}

const removeNumbers = value => {
  let newValue = value.replace(/[^a-zA-Z\s]/g, '').replace('  ', ' ').trimStart()

  return newValue
}

const barInsertion = value => {
  let newValue = value.trim()

  if (!newValue.includes('/') && newValue.length > 2) {
    newValue = newValue.replace(/(\d{2})/, '$1/')
  }
  else if (newValue.includes('/') && newValue.length == 3) {
    newValue = newValue.replace(/\//, '')
  }

  return newValue
}

const validator = value => {
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

const numberValidator = () => {
  const $number = document.querySelector('.js-form-field-number')
  const $group  = $number.closest('.js-form-group')

  if ($number.value.length == 19) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

const nameValidator = () => {
  const $name      = document.querySelector('.js-form-field-name')
  const $group     = $name.closest('.js-form-group')
  const expression = /^[a-zA-z]+ [a-zA-Z]+$/

  if (expression.test($name.value)) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

const validityValidator = () => {
  const $validity = document.querySelector('.js-form-field-validity')
  const $group    = $validity.closest('.js-form-group')

  if ($validity.value.length == 5) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

const CVVValidator = () => {
  const $cvv   = document.querySelector('.js-form-field-cvv')
  const $group = $cvv.closest('.js-form-group')

  if ($cvv.value.length > 2) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

const installmentsValidator = () => {
  const $installments = document.querySelector('.js-form-selection-installments')
  const $group        = $installments.closest('.js-form-group')

  if ($installments.value) {
    $group.classList.remove('invalid')
  }
  else {
    $group.classList.add('invalid')
  }
}

const flagValidation = () => {
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

const resetFlag = () => {
  const $card = document.querySelector('.js-card')

  $card.classList.remove('visa')
  $card.classList.remove('mastercard')
}

const activeFlag = flag => {
  resetFlag()

  const $card = document.querySelector('.js-card')

  $card.classList.add(flag)
}