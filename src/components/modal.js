// функция закрытия попапа
export function closeModal() {
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened'); 
};

// функция закрытия попапа по кнопке и оверлею
export function closeModalEvents (evt) {
  if (evt.target.closest('.popup__close') || evt.key === 'Escape' || evt.target === evt.currentTarget) {
    closeModal(); 
  }
    document.removeEventListener('keydown', closeModalEvents);
};

// функция открытия попапа
export function openModal(modalSelector) {
  modalSelector.classList.add('popup_is-animated');
  
  setTimeout ( function () {
  modalSelector.classList.add('popup_is-opened');
  }, 100);

  document.addEventListener('keydown', closeModalEvents);
  modalSelector.addEventListener('click', closeModalEvents);
};