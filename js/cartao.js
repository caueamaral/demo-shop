;(() => {
  const cartaoPreencher = () => {
    const $campos = document.querySelectorAll('.js-cartao-data-bind')

    $campos.forEach($campo => {
      $campo.addEventListener('input', () => preencher(event))
    })

    const preencher = () => {
      const alvo  = event.currentTarget.dataset.bind        
      const $alvo = document.querySelector(`.js-cartao-data-bind-alvo[data-bind=${alvo}]`)

      $alvo.textContent = inserirEspacos(event.currentTarget.value)
    }
  }

  cartaoPreencher()
})()


const inserirEspacos = alvo => alvo.replace(/(\d{4})/g, '$1 ').trim()