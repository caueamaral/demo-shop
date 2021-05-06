;(() => {
  const cartaoNumero = () => {
    const $campoNumero = document.querySelector('.js-cartao-campo-numero')
  
    $campoNumero.addEventListener('input', () => {
      document.querySelector('.js-cartao-numeros').textContent = event.currentTarget.value
    })
  }
  
  cartaoNumero()
})()