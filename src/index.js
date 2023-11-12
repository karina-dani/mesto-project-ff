// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов, при отправке форм, при лайке и удалении карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

import './pages/index.css'; 
import {initialCards} from './scripts/cards.js';
import {createCard, likeCard, deleteCard} from './components/card.js';
import {closeModalEvents, closeModal, openModal} from './components/modal.js';

//контейнер с карточками
const placesList = document.querySelector('.places__list');

//попап редактирование профиля
const editModal = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

//попап новая карточка
const addButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');

//попап увеличенная картинка
const imageModal = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

//переменные формы
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const addingForm = document.querySelector('form[name="new-place"]');

// вывод карточек на страницу 
initialCards.forEach(function (element) {
  const card = createCard(element, clickImage, likeCard, deleteCard);
  placesList.append(card);
});

// слушатель для попапа редактирования профиля
editButton.addEventListener('click', function () {
  openModal(editModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// слушатель для попапа добавления картинки
addButton.addEventListener('click', function () {
  openModal(newCardModal);
}); 

// функция клика по картинке карточки
function clickImage (evt) {
  openModal(imageModal);
  image.src = evt.target.src;
  caption.textContent = evt.target.alt;
}

// обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  formElement.reset(); 
  closeModal();
}

formElement.addEventListener('submit', handleFormSubmit);


// обработчик добавления картинки 
function addCard(evt) {
  evt.preventDefault(); 

  const placeName = document.querySelector('.popup__input_type_card-name');
  const placeUrl = document.querySelector('.popup__input_type_url');

  const newCard = {
  name: placeName.value,
  link: placeUrl.value
  };

  const addedCard = createCard(newCard, clickImage, likeCard, deleteCard);

  placesList.prepend(addedCard);

  addingForm.reset(); 
  closeModal() 
}

addingForm.addEventListener('submit', addCard); 

