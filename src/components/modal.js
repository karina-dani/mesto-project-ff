// функция закрытия попапа
export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened'); 

  document.removeEventListener('keydown', closeModalWithEsc);
};

// функция закрытия попапа по кнопке Esc
export function closeModalWithEsc (evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
      closeModal(openedModal);  
  }
};

// функция закрытия попапа по клику
export function closeModalOnClick (evt) {
  if (evt.target.closest('.popup__close') || evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget); 
  }
};

// функция открытия попапа
export function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeModalWithEsc);
};