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
  
      validarNumero()
      validarname()
      validarvalidity()
      validarCVV()
      validarParcelas()
    })
  }

  const cardBandeiras = () => {
    const $numeros = document.querySelector('.js-form-field-numero')

    $numeros.addEventListener('input', () => {
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
  const alvo           = event.target.dataset.bind
  const valor          = event.target.value
  const valorSemLetras = removerLetras(valor)
  let novoValor        = ''

  switch(alvo) {
    case 'numero':
      novoValor = inserirEspacos(valorSemLetras)
    break
    case 'name':
      novoValor = removerNumeros(valor)
    break
    case 'validity':
      novoValor = inserirBarra(valorSemLetras)
    break
    case 'cvv':
      novoValor = valorSemLetras
    break
  }

  if (alvo != 'parcelas') {
    event.target.value = novoValor
  }
}

const preencher = () => {
  const alvo    = event.target.dataset.bind
  const $alvo   = document.querySelector(`.js-card-data-bind-alvo[data-bind=${alvo}]`)
  const valor   = event.target.value
  let novoValor = ''

  switch(alvo) {
    case 'numero':
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

  $alvo.textContent = novoValor

  if (!$alvo.textContent) {

    if (alvo == 'numero') {
      $alvo.innerHTML = `<span class="card-front-numeros-interno">${$alvo.getAttribute('placeholder')}</span>`
    }
    else if (alvo == 'cvv') {
      $alvo.innerHTML = `<span class="card-back-cvv-interno">${$alvo.getAttribute('placeholder')}</span>`
    }
    else {
      $alvo.textContent = $alvo.getAttribute('placeholder')
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

const removerNumeros = valor => {
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
  const alvo = event.target.dataset.bind

  switch(alvo) {
    case 'numero':
      validarNumero()
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

const validarNumero = () => {
  const $numero = document.querySelector('.js-form-field-numero')
  const $group  = $numero.closest('.js-form-group')

  if ($numero.value.length == 19) {
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

  function bandeiraTestar(bandeira, numeros) {

    numeros.forEach(numero => {

      if (valor.startsWith(numero)) {
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