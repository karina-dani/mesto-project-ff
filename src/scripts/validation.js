//функция показать сообщение об ошибке
export const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //ищем поле ввода с ошибкой
  inputElement.classList.add(config.inputErrorClass); //добавляем ему красное подчеркивание
  errorElement.classList.add(config.errorClass); //добавляем класс с сообщением для отображения
  errorElement.textContent = inputElement.validationMessage; //вставляем стандартное сообщение в наш спан
};

//ф-ия спрятать сообщение об ошибке
export const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = ""; //очистили ошибку
};

//проверка валидности
export const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

//проверяем, что все поля правильно заполнены
export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//блокировка и разблокировка кнопки
export const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
};

//очистка ошибок валидации и блок кнопки
export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  formElement.reset();
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
};

//вешем слушатели проверки валидности и состояния кнопки
export const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//вешаем кастомную валидацию на формы
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};
