;(() => {
  const cartaoPreencher = () => {
    const $campos = document.querySelectorAll('.js-cartao-data-bind')

    $campos.forEach($campo => {
      $campo.addEventListener('input', () => formatar(event))
      $campo.addEventListener('input', () => preencher(event))
    })
  }

  const cartaoAparar = () => {
    const $campoNome = document.querySelector('.js-cartao-campo-nome')

    $campoNome.addEventListener('blur', () => {
      event.target.value = event.target.value.trim()
    })
  }

  const cartaoFlip = () => {
    const $cartao   = document.querySelector('.js-cartao')
    const $campoCVV = document.querySelector('.js-cartao-campo-cvv')

    const flipAtivo   = () => $cartao.classList.add('flip')
    const flipInativo = () => $cartao.classList.remove('flip')

    $campoCVV.addEventListener('focus', flipAtivo)
    $campoCVV.addEventListener('blur', flipInativo)
  }

  const cartaoValidar = () => {
    const $campos = document.querySelectorAll('.js-cartao-data-bind')

    $campos.forEach($campo => $campo.addEventListener('input', () => validar(event)))
  }

  cartaoPreencher()
  cartaoAparar()
  cartaoFlip()
  cartaoValidar()
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
    case 'nome':
      novoValor = removerNumeros(valor)
    break
    case 'validade':
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
  const $alvo   = document.querySelector(`.js-cartao-data-bind-alvo[data-bind=${alvo}]`)
  const valor   = event.target.value
  const vazio   = !$alvo?.textContent
  let novoValor = ''

  switch(alvo) {
    case 'numero':
      novoValor = inserirEspacos(valor)
    break
    case 'validade':
      novoValor = inserirBarra(valor)
    break
    case 'nome':
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

  if (vazio) {

    if (alvo == 'cvv') {
      $alvo.innerHTML = `<span class="cartao-verso-cvv-interno">${$alvo.getAttribute('placeholder')}</span>`
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
  let novoValor = valor.replace(/[^a-zA-Z\s]/g, '').replace('  ', ' ')

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

  if (alvo == 'numero') {
    validarNumero()
  }
  else if (alvo == 'nome') {
    validarNome()
  }
  else if (alvo == 'validade') {
    validarValidade()
  }
  else if (alvo == 'cvv') {
    validarCVV()
  }
  else if (alvo == 'parcelas') {
    validarParcelas()
  }

  function validarNumero() {
    const $grupo = event.target.closest('.js-form-grupo')

    if (event.target.value.length == 19) {
      $grupo.classList.remove('invalido')
    }
    else {
      $grupo.classList.add('invalido')
    }
  }

  function validarNome() {
    const $grupo = event.target.closest('.js-form-grupo')

    if (event.target.value.length > 4 && event.target.value.includes(' ')) {
      $grupo.classList.remove('invalido')
    }
    else {
      $grupo.classList.add('invalido')
    }
  }

  function validarValidade() {
    const $grupo = event.target.closest('.js-form-grupo')

    if (event.target.value.length == 5) {
      $grupo.classList.remove('invalido')
    }
    else {
      $grupo.classList.add('invalido')
    }
  }

  function validarCVV() {
    const $grupo = event.target.closest('.js-form-grupo')

    if (event.target.value.length == 3) {
      $grupo.classList.remove('invalido')
    }
    else {
      $grupo.classList.add('invalido')
    }
  }

  function validarParcelas() {
    const $grupo = event.target.closest('.js-form-grupo')

    if (event.target.value) {
      $grupo.classList.remove('invalido')
    }
    else {
      $grupo.classList.add('invalido')
    }
  }
}