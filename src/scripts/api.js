//настройки для запросов на сервер
const requestConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
  headers: {
    authorization: '0cbc34aa-4222-462c-b079-63eb6ab84b75',
    'Content-Type': 'application/json'
  }
}

//функция запроса пользовательской инфо на сервере
export const getUserInfo = () => {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
    headers: requestConfig.headers
  })
  .then((res) => {
    if (res.ok) {
    return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
   .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
 }); 
}

//функция для запроса пользовательских карточек на сервере
export const getUserCards = () => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    headers: requestConfig.headers
  })
  .then((res) => {
    if (res.ok) {
    return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  }); 
}

//функция для отправки нового логина и описания на сервер 
export const editUserProfile = (nameInput, jobInput) => {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: requestConfig.headers,
  body: JSON.stringify({
    name: nameInput,
    about: jobInput
  })
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 
}

//смена аватара пользователя на сервере
export const editUserProfileImage = (profileImageUrl) => {
  return fetch(`${requestConfig.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: requestConfig.headers,
  body: JSON.stringify({
    avatar: profileImageUrl,
  })
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 
}

 //функция для добавления новой карточки на сервер 
 export const addUserCard = (placeName, placeUrl) => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
  method: 'POST',
  headers: requestConfig.headers,
  body: JSON.stringify({
    name: placeName,
    link: placeUrl,
  })
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 
}

//функция удаления карточки с сервера 
export const deleteUserCard = (cardId) => {
  return fetch(`${requestConfig.baseUrl}/cards/` + cardId, {
  method: 'DELETE',
  headers: requestConfig.headers
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 
}

//отправка лайка на сервер
export const addLikeToUserCard = (cardId) => {
  return fetch(`${requestConfig.baseUrl}/cards/likes/` + cardId, {
  method: 'PUT',
  headers: requestConfig.headers
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 
}

//убрать лайк с сервера
export const deleteLikeFromUserCard = (cardId) => {
  return fetch(`${requestConfig.baseUrl}/cards/likes/` + cardId, {
  method: 'DELETE',
  headers: requestConfig.headers
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 
}
