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

  const cartaoValidarCampos = () => {
    const $campos = document.querySelectorAll('.js-cartao-data-bind')

    $campos.forEach($campo => $campo.addEventListener('input', () => validar(event)))
  }

  const cartaoValidarEnvio = () => {
    const $botao = document.querySelector('.js-form-botao')

    $botao.addEventListener('click', () => {
      event.preventDefault()
  
      validarNumero()
      validarNome()
      validarValidade()
      validarCVV()
      validarParcelas()
    })
  }

  cartaoPreencher()
  cartaoAparar()
  cartaoFlip()
  cartaoValidarCampos()
  cartaoValidarEnvio()
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

  if (!$alvo.textContent) {

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
    case 'nome':
      validarNome()
    break
    case 'validade':
      validarValidade()
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
  const $numero = document.querySelector('.js-form-campo-numero')
  const $grupo  = $numero.closest('.js-form-grupo')

  if ($numero.value.length == 19) {
    $grupo.classList.remove('invalido')
  }
  else {
    $grupo.classList.add('invalido')
  }
}

const validarNome = () => {
  const $nome     = document.querySelector('.js-form-campo-nome')
  const $grupo    = $nome.closest('.js-form-grupo')
  const expressao = /^[a-zA-z]+ [a-zA-Z]+$/

  if (expressao.test($nome.value)) {
    $grupo.classList.remove('invalido')
  }
  else {
    $grupo.classList.add('invalido')
  }
}

const validarValidade = () => {
  const $validade = document.querySelector('.js-form-campo-validade')
  const $grupo    = $validade.closest('.js-form-grupo')

  if ($validade.value.length == 5) {
    $grupo.classList.remove('invalido')
  }
  else {
    $grupo.classList.add('invalido')
  }
}

const validarCVV = () => {
  const $cvv   = document.querySelector('.js-form-campo-cvv')
  const $grupo = $cvv.closest('.js-form-grupo')

  if ($cvv.value.length == 3) {
    $grupo.classList.remove('invalido')
  }
  else {
    $grupo.classList.add('invalido')
  }
}

const validarParcelas = () => {
  const $parcelas = document.querySelector('.js-form-selecao-parcelas')
  const $grupo    = $parcelas.closest('.js-form-grupo')

  if ($parcelas.value) {
    $grupo.classList.remove('invalido')
  }
  else {
    $grupo.classList.add('invalido')
  }
}