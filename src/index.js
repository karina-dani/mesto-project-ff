// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов, при отправке форм, при лайке и удалении карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

import './pages/index.css'; 
import {initialCards} from './scripts/cards.js';
import {createCard, likeCard, deleteCard} from './components/card.js';
import {closeModalWithEsc, closeModalOnClick, closeModal, openModal} from './components/modal.js';

//контейнер с карточками
const placesList = document.querySelector('.places__list');

//попапы
const Modal = document.querySelectorAll('.popup');

//попап редактирование профиля
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

//попап новая карточка
const newCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');

//попап увеличенная картинка
const cardImageModal = document.querySelector('.popup_type_image');

//переменные форм
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const addCardForm = document.querySelector('form[name="new-place"]');

const placeName = document.querySelector('.popup__input_type_card-name');
const placeUrl = document.querySelector('.popup__input_type_url');

// вывод карточек на страницу 
initialCards.forEach(function (element) {
  const card = createCard(element, clickImage, likeCard, deleteCard);
  placesList.append(card);
});

// слушатель для закрытия попапов по клику
Modal.forEach(function (element){
 element.addEventListener('click', closeModalOnClick);
});

// слушатель для попапа редактирования профиля
editProfileButton.addEventListener('click', function () {
  openModal(editProfileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// слушатель для попапа добавления картинки
addCardButton.addEventListener('click', function () {
  openModal(newCardModal);
}); 

// функция клика по картинке карточки
function clickImage () {
  openModal(cardImageModal);
};

// обработчик «отправки» формы
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editProfileForm.reset(); 
  closeModal(editProfileModal);
};

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// обработчик добавления картинки 
function addCard(evt) {
  evt.preventDefault(); 

  const newCard = {
  name: placeName.value,
  link: placeUrl.value
  };

  const addedCard = createCard(newCard, clickImage, likeCard, deleteCard);
  placesList.prepend(addedCard);

  addCardForm.reset(); 
  closeModal(newCardModal); 
}

addCardForm.addEventListener('submit', addCard); 

