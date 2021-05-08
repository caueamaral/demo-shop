;(() => {
  const cardPreencher = () => {
    const $fields = document.querySelectorAll('.js-card-data-bind')

    $fields.forEach($field => {
      $field.addEventListener('input', () => formatar(event))
      $field.addEventListener('input', () => preencher(event))
    })
  }

  const cardAparar = () => {
    const $fieldName = document.querySelector('.js-card-field-name')

    $fieldName.addEventListener('blur', () => {
      event.target.value = event.target.value.trim()
    })
  }

  const cardFlip = () => {
    const $card     = document.querySelector('.js-card')
    const $fieldCVV = document.querySelector('.js-card-field-cvv')

    const flipAtivo   = () => $card.classList.add('flip')
    const flipInativo = () => $card.classList.remove('flip')

    $fieldCVV.addEventListener('focus', flipAtivo)
    $fieldCVV.addEventListener('blur',  flipInativo)
  }

  const cardValidarfields = () => {
    const $fields = document.querySelectorAll('.js-card-data-bind')

    $fields.forEach($field => $field.addEventListener('input', () => validar(event)))
  }

  const cardValidarEnvio = () => {
    const $botao = document.querySelector('.js-form-botao')

    $botao.addEventListener('click', () => {
      event.preventDefault()
  
      validarnumber()
      validarname()
      validarvalidity()
      validarCVV()
      validarParcelas()
    })
  }

  const cardBandeiras = () => {
    const $numbers = document.querySelector('.js-form-field-number')

    $numbers.addEventListener('input', () => {
      validarBandeira()
    })
  }

  cardPreencher()
  cardAparar()
  cardFlip()
  cardValidarfields()
  cardValidarEnvio()
  cardBandeiras()
})()

const formatar = () => {
  const target           = event.target.dataset.bind
  const valor          = event.target.value
  const valorSemLetras = removerLetras(valor)
  let novoValor        = ''

  switch(target) {
    case 'number':
      novoValor = inserirEspacos(valorSemLetras)
    break
    case 'name':
      novoValor = removernumbers(valor)
    break
    case 'validity':
      novoValor = inserirBarra(valorSemLetras)
    break
    case 'cvv':
      novoValor = valorSemLetras
    break
  }

  if (target != 'parcelas') {
    event.target.value = novoValor
  }
}

const preencher = () => {
  const target    = event.target.dataset.bind
  const $target   = document.querySelector(`.js-card-data-bind-target[data-bind=${target}]`)
  const valor   = event.target.value
  let novoValor = ''

  switch(target) {
    case 'number':
      novoValor = inserirEspacos(valor)
    break
    case 'validity':
      novoValor = inserirBarra(valor)
    break
    case 'name':
      novoValor = valor
    break
    case 'cvv':
      novoValor = valor
    break
    case 'parcelas':
      return
    break
  }

  $target.textContent = novoValor

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

const inserirEspacos = valor => {
  let novoValor = valor
    .replace(/\s/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()

  return novoValor
}

const removerLetras = valor => {
  let novoValor = valor.replace(/\D/g, '')

  return novoValor
}

const removernumbers = valor => {
  let novoValor = valor.replace(/[^a-zA-Z\s]/g, '').replace('  ', ' ').trimStart()

  return novoValor
}

const inserirBarra = valor => {
  let novoValor = valor.trim()

  if (!novoValor.includes('/') && novoValor.length > 2) {
    novoValor = novoValor.replace(/(\d{2})/, '$1/')
  }
  else if (novoValor.includes('/') && novoValor.length == 3) {
    novoValor = novoValor.replace(/\//, '')
  }

  return novoValor
}

const validar = valor => {
  const target = event.target.dataset.bind

  switch(target) {
    case 'number':
      validarnumber()
    break
    case 'name':
      validarname()
    break
    case 'validity':
      validarvalidity()
    break
    case 'cvv':
      validarCVV()
    break
    case 'parcelas':
      validarParcelas()
    break
  }
}

const validarnumber = () => {
  const $number = document.querySelector('.js-form-field-number')
  const $group  = $number.closest('.js-form-group')

  if ($number.value.length == 19) {
    $group.classList.remove('invalido')
  }
  else {
    $group.classList.add('invalido')
  }
}

const validarname = () => {
  const $name     = document.querySelector('.js-form-field-name')
  const $group    = $name.closest('.js-form-group')
  const expressao = /^[a-zA-z]+ [a-zA-Z]+$/

  if (expressao.test($name.value)) {
    $group.classList.remove('invalido')
  }
  else {
    $group.classList.add('invalido')
  }
}

const validarvalidity = () => {
  const $validity = document.querySelector('.js-form-field-validity')
  const $group    = $validity.closest('.js-form-group')

  if ($validity.value.length == 5) {
    $group.classList.remove('invalido')
  }
  else {
    $group.classList.add('invalido')
  }
}

const validarCVV = () => {
  const $cvv   = document.querySelector('.js-form-field-cvv')
  const $group = $cvv.closest('.js-form-group')

  if ($cvv.value.length > 2) {
    $group.classList.remove('invalido')
  }
  else {
    $group.classList.add('invalido')
  }
}

const validarParcelas = () => {
  const $parcelas = document.querySelector('.js-form-selection-parcelas')
  const $group    = $parcelas.closest('.js-form-group')

  if ($parcelas.value) {
    $group.classList.remove('invalido')
  }
  else {
    $group.classList.add('invalido')
  }
}

const validarBandeira = () => {
  let valor               = event.target.value
  let bandeiraEncontrada = ''

  if (valor.length < 2) {
    return bandeiraResetar()
  }
  
  bandeiraTestar('visa',       ['4'])
  bandeiraTestar('mastercard', ['51', '52', '53', '54', '55'])

  if (bandeiraEncontrada) {
    bandeiraAtivar(bandeiraEncontrada)
  }

  function bandeiraTestar(bandeira, numbers) {

    numbers.forEach(number => {

      if (valor.startsWith(number)) {
        return bandeiraEncontrada = bandeira
      }
    })
  }
}

const bandeiraResetar = () => {
  const $card = document.querySelector('.js-card')

  $card.classList.remove('visa')
  $card.classList.remove('mastercard')
}

const bandeiraAtivar = bandeira => {
  bandeiraResetar()

  const $card = document.querySelector('.js-card')

  $card.classList.add(bandeira)
}