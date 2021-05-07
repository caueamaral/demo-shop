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

  cartaoPreencher()
  cartaoAparar()
  cartaoFlip()
})()

const formatar = () => {
  const alvo           = event.target.dataset.bind
  const valorSemLetras = removerLetras(event.target.value)

  if (alvo == 'numero') {
    event.target.value = inserirEspacos(valorSemLetras)
  }
  else if (alvo == 'nome') {
    event.target.value = removerNumeros(event.target.value)
  }
  else if (alvo == 'validade') {
    event.target.value = inserirBarra(valorSemLetras)
  }
  else if (alvo == 'cvv') {
    event.target.value = valorSemLetras
  }
}

const preencher = () => {
  const alvo  = event.target.dataset.bind
  const $alvo = document.querySelector(`.js-cartao-data-bind-alvo[data-bind=${alvo}]`)
  let valor   = event.target.value

  if (alvo == 'numero') {
    valor = inserirEspacos(valor)
  }
  else if (alvo == 'validade') {
    valor = inserirBarra(valor)
  }

  $alvo.textContent = valor

  if (!$alvo.textContent) {
    $alvo.textContent = $alvo.getAttribute('placeholder')
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