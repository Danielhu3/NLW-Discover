import Modal from './modal.js'

const modal = Modal()

//elementos do modal
const modalTitle = document.querySelector('.modal h2')

const modalDescription = document.querySelector('.modal p')

const modalButton = document.querySelector('.modal button')

//pegar todos os botões existententes com a classe check
const checkButtons = document.querySelectorAll('.actions a.check')
//varrer todos os buttons
checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})

//pegar todos os botões com a classe delete
const deleteButtons = document.querySelectorAll('.actions a.delete')
//varrer buttons
deleteButtons.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})

function handleClick(event, check = true) {
  event.preventDefault()

  //Envio de informações
  const roomId = document.querySelector('#room-id').dataset.id

  //slug = texto da url
  const slug = check ? 'check' : 'delete'

  // as informações da questão escolhida estão dentro do event
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  // Textos do Modal
  const text = check ? 'Marcar como lida' : 'Excluir'
  modalTitle.innerHTML = `${text} esta pergunta?`

  modalDescription.innerHTML = `Deseja ${text.toLowerCase()} esta pergunta?`

  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`

  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  modal.open()
}
