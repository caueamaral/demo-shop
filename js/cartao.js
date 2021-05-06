;(() => {
  const cartaoNumero = () => {
    const $campoNumero = document.querySelector('.js-cartao-numero')
  
    $campoNumero.addEventListener('input', () => {
      console.log(event.currentTarget.value)
    })
  }
  
  cartaoNumero()
})()