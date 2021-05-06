;(() => {
  const cartaoPreencherNumero = () => {
    const $campoNumero = document.querySelector('.js-cartao-campo-numero')
    const $numeros     = document.querySelector('.js-cartao-numeros')
  
    $campoNumero.addEventListener('input', () => {
      $numeros.textContent = inserirEspaco(event.currentTarget.value)
    })
  }
  
  cartaoPreencherNumero()
})()


const inserirEspaco = valor => valor.replace(/(\d{4})/g, '$1 ').trim()