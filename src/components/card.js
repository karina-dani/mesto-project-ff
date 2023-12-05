

//функция вывода карточки и всех операций с ней
export function createCard(element, clickImage, likeCard, handleDeleteModal, profileId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const cardImageModal = document.querySelector('.popup_type_image');

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  likeCount.textContent = element.likes.length;
  cardElement.dataset.cardId = element._id;
  const cardId = element._id;
  const cardLikes = element.likes;

  cardImage.addEventListener('click', () => clickImage(cardImageModal, cardImage));

//добавляем в разметке лайк, если карточка была лайкнута пользователем 
  cardLikes.forEach((like) => {
    if(like._id === profileId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  })

  likeButton.addEventListener('click', () => likeCard(likeButton, likeCount, cardId)); 

//если карточка была создана пользователем, возможно удаление  
  if (element.owner._id !== profileId) { 
    deleteButton.remove();
  } else { 
    deleteButton.addEventListener('click', () => handleDeleteModal(cardId));
  };

  return cardElement;
}

