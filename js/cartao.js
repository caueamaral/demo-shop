;(() => {
  const cartaoPreencher = () => {
    const $campos = document.querySelectorAll('.js-cartao-data-bind')

    $campos.forEach($campo => {
      $campo.addEventListener('input', () => preencher(event))
      $campo.addEventListener('input', () => formatar(event))
    })

    const preencher = () => {
      const alvo  = event.target.dataset.bind        
      const $alvo = document.querySelector(`.js-cartao-data-bind-alvo[data-bind=${alvo}]`)
      let valor   = event.target.value

      if (alvo == 'numero') {
        valor = formatarEspacos(valor)
      }
      else if (alvo == 'validade') {
        valor = formatarBarra(valor)
      }

      $alvo.textContent = valor

      if (!$alvo.textContent) {
        $alvo.textContent = $alvo.getAttribute('placeholder')
      }
    }

    const formatar = () => {
      const alvo = event.target.dataset.bind

      if (alvo == 'numero') {
        event.target.value = formatarEspacos(event.target.value)
      }
      else if (alvo == 'validade') {
        event.target.value = formatarBarra(event.target.value)
      }
    }
  }

  cartaoPreencher()
})()


const formatarEspacos = valor => {
  let novoValor = valor
    .replace(/\s/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()

  return novoValor
}

const formatarBarra = valor => {
  let novoValor = valor.trim()

  if (!novoValor.includes('/') && novoValor.length > 2) {
    novoValor = novoValor.replace(/(\d{2})/, '$1/')
  }
  else if (novoValor.includes('/') && novoValor.length == 3) {
    novoValor = novoValor.replace(/\//, '')
  }

  return novoValor
}