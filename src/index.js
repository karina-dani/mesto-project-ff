// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов, при отправке форм, при лайке и удалении карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

import './pages/index.css'; 
import {createCard} from './components/card.js';
import {closeModalWithEsc, closeModalOnClick, closeModal, openModal} from './components/modal.js';
import {clearValidation, enableValidation} from './scripts/validation.js';
import {getUserInfo, getUserCards, editUserProfile, editUserProfileImage, addUserCard, deleteUserCard, addLikeToUserCard, deleteLikeFromUserCard} from './scripts/api.js';

//контейнер с карточками
const placesList = document.querySelector('.places__list');

//данные профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
let profileId = '';

//попапы
const modalList = document.querySelectorAll('.popup');

//попап редактирование профиля
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//попап редактирование аватара
const editProfileImageModal = document.querySelector('.popup_type_edit-avatar');
const editProfileImageButton = document.querySelector('.profile__image');
const editProfileImageForm = document.querySelector('form[name="edit-avatar"]');
const profileImageUrl = document.querySelector('.popup__input_type_avatar');

//попап новая карточка
const newCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.querySelector('form[name="new-place"]');
const placeName = document.querySelector('.popup__input_type_card-name');
const placeUrl = document.querySelector('.popup__input_type_url');

//попап увеличенная картинка
const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

//попап удаление картинки
const deleteCardModal = document.querySelector('.popup_type_delete-card');
const deleteCardForm = document.querySelector('form[name="delete-card"]');

//настройки валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//функция для использования пользовательской инфо с сервера
function renderUserInfo(info) {
  profileId = info._id;
  profileName.textContent = info.name;
  profileJob.textContent = info.about; 
  editProfileImageButton.setAttribute("style", `background-image: url(${info.avatar})`);
}

//функция для вывода пользовательских карточек с сервера
function renderUserCards(cards) {
  cards.forEach((element) => {
  const card = createCard(element, clickImage, likeCard, handleDeleteModal, profileId);
  placesList.append(card);
  }); 
} 

//вывод актуальной инфо пользователя и карт на страницу
const promiseAll = Promise.all([getUserInfo(), getUserCards()])
  .then((res) => {
  renderUserInfo(res[0]);
  renderUserCards(res[1]);
  })

// слушатель для закрытия попапов по клику
modalList.forEach(function (element){
  element.addEventListener('click', closeModalOnClick);
 });

//функция добавлением лоадера, пока форма грузится 
 function renderLoading (isLoading, form) {
  const modalPreloader = form.querySelector('.popup__preloader');

  if (isLoading) {
    modalPreloader.classList.add('popup__preloader_visible');
  } else {
    modalPreloader.classList.remove('popup__preloader_visible');
  }

 }

 // слушатель для попапа редактирования профиля
editProfileButton.addEventListener('click', function () {
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// обработчик «отправки» формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  renderLoading(true, editProfileForm);
  editUserProfile(nameInput.value, jobInput.value)
    .then ((res) => {
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
    })
    .catch((err) => {
      renderError('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false, editProfileForm);
      editProfileForm.reset(); 
      closeModal(editProfileModal);
    })
};

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// слушатель для попапа редактирования аватара
editProfileImageButton.addEventListener('click', function () {
  clearValidation(editProfileImageForm, validationConfig);
  openModal(editProfileImageModal);
}); 

// обработчик «отправки» формы редактирования аватара
function handleEditProfileImageFormSubmit(evt) {
  evt.preventDefault(); 
  renderLoading(true, editProfileImageForm);
  editUserProfileImage(profileImageUrl.value)
    .then((res) => {
      editProfileImageButton.setAttribute("style", `background-image: url(${res.avatar})`);
    })
    .catch((err) => {
      renderError('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false, editProfileImageForm);
      editProfileImageForm.reset(); 
      closeModal(editProfileImageModal);
    })
};

editProfileImageForm.addEventListener('submit', handleEditProfileImageFormSubmit);

// слушатель для попапа добавления картинки
addCardButton.addEventListener('click', function () {
  clearValidation(addCardForm, validationConfig);
  openModal(newCardModal);
}); 

// обработчик добавления картинки 
function addCard(evt) {
  evt.preventDefault(); 
  renderLoading(true, addCardForm);
  addUserCard(placeName.value, placeUrl.value)
    .then((data) => { 

  const newCard = {
  name: data.name,
  link: data.link,
  likes: data.likes,
  owner: { _id: data.owner._id
  },
  _id: data._id
  };

  const addedCard = createCard(newCard, clickImage, likeCard, handleDeleteModal, profileId);
  placesList.prepend(addedCard);
})
  .catch((err) => {
    renderError('Ошибка. Запрос не выполнен: ', err);
  })
  .finally(() => {
    renderLoading(false, addCardForm);
    addCardForm.reset(); 
    closeModal(newCardModal); 
  })    
}

addCardForm.addEventListener('submit', addCard); 

//функция получения cardId и открытия окна удаления
function handleDeleteModal (cardId) {
  deleteCardForm.dataset.id = cardId;
  openModal(deleteCardModal);
}

//функция удаления карточки из разметки
export function deleteCard(cardId) {
  const cards = document.querySelectorAll('.places__item');
  cards.forEach((element) => {
    if (element.dataset.cardId === cardId) {
      element.remove();
    }
  })
} 

//обработчик удаления карточки
function handleDeleteCardSubmit(evt) {
  evt.preventDefault(); 
  cardId = deleteCardForm.dataset.id;

  deleteUserCard(cardId)
    .then(() => {    
  deleteCard(cardId);
  closeModal(deleteCardModal);
    })
};

deleteCardForm.addEventListener('submit', handleDeleteCardSubmit);


//функия работы с лайком
function likeCard(likeButton, likeCount, cardId) {

  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLikeFromUserCard(cardId)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
        
      })
  } else {
    addLikeToUserCard(cardId)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
  }
}

// функция клика по картинке карточки
function clickImage (cardImageModal, cardImage) {
  openModal(cardImageModal);
  modalImage.src = cardImage.src;
  modalImage.alt = cardImage.alt;
  modalCaption.textContent = cardImage.alt;
};

//вызов валидации форм
enableValidation(validationConfig)
