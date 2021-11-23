export default function Modal() {
  const cancelButton = document.querySelector('.button.cancel')
  const modalWrapper = document.querySelector('.modal-wrapper')

  cancelButton.addEventListener('click', close)

  function open() {
    //atribuir a classe active para o modal
    modalWrapper.classList.add('active')
  }

  function close() {
    // fechar

    modalWrapper.classList.remove('active')
  }

  return {
    open,
    close
  }
}
