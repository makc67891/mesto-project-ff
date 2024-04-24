// Конфиг запроса на сервер
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "338281d1-6beb-412e-b916-78b6ea40eb54",
    "Content-Type": "application/json",
  },
};

// Функция проверки запроса
function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

// Запрос на сервер для получения информации о пользователе
export function requestUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResult);
}

// Запрос на сервер для получения карточек
export function requestRenderCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResult);
}

// Запрос на сервер для редактировании аватара
export function requestEditAvatar(link) {
  // preloaderSaveButton(editAvatarPopup, true);
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(checkResult);
}

// Запрос на сервер для редактировании информации о пользователе
export function requestUpdateUserInfo(name, description) {
  // preloaderSaveButton(editProfilePopup, true);
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then(checkResult);
}

// Запроос на сервер для добавления новой карточки
export function requestAddNewCard(name, link) {
  // preloaderSaveButton(addNewCardPopup, true);
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResult);
}

// Запрос на сервер для удаления карточки
export function requestDeleteCard(card) {
  return fetch(`${config.baseUrl}/cards/${card.id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResult);
}

// Запрос на сервер чтоб поставить лайк
export function requestAddLike(item) {
  return fetch(`${config.baseUrl}/cards/likes/${item.id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResult);
}

// Запрос на сервер чтоб убрать лайк
export function requestRemoveLike(item) {
  return fetch(`${config.baseUrl}/cards/likes/${item.id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResult);
}
