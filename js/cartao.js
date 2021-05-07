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

      $alvo.textContent = valor
    }

    const formatar = () => {
      const alvo = event.target.dataset.bind

      if (alvo == 'numero') {
        event.target.value = formatarEspacos(event.target.value.trim())
      }
      else if (alvo == 'validade') {
        console.log(event.target.value)

        event.target.value = formatarBarra(event.target.value.trim())
      }
    }
  }

  cartaoPreencher()
})()


const formatarEspacos = alvo => {
  return alvo
    .replace(/(\/)/, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}

const formatarBarra = alvo => {
  return alvo
    .replace(/\//, '')
    .replace(/(\d{2})/, '$1/')
    .trim()
}