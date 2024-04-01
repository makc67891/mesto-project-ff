// Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", listenerEsc);
}

// Функция закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", listenerEsc);
}

// Слушатель по нажатию на Esc
export function listenerEsc(evt) {
  if (evt.keyCode === 27) {
    closeModal(searchIsOpenedPopup());
  }
}

// Поиск открытого модального окна
export function searchIsOpenedPopup() {
  return document.querySelector(".popup_is-opened");
}

// Проверка на клик по крестику и оверлею
export function clickClosed(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(searchIsOpenedPopup());
  }
  if (evt.target === evt.currentTarget) {
    closeModal(searchIsOpenedPopup());
  }
}
