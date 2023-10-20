// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function addCard(element, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
};

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

initialCards.forEach(function (element) {
  const card = addCard(element, deleteCard);
  placesList.append(card);
});



