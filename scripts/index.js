// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(element, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard);
  placesList.append(card);
});



