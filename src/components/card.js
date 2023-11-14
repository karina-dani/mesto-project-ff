
//функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

//функция лайка карточки
export function likeCard(likeButton) {
   likeButton.classList.toggle('card__like-button_is-active');
}

//функция вывода карточки и всех операций с ней
export function createCard(element, clickImage, likeCard, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImageModal = document.querySelector('.popup_type_image');

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  cardImage.addEventListener('click', () => clickImage(cardImageModal, cardImage));

  likeButton.addEventListener('click', () => likeCard(likeButton)); 

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

