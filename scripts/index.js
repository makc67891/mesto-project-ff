// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
function addPlacesItem(name, link) {
  const placesItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  placesItem.querySelector(".card__image").src = link;
  placesItem.querySelector(".card__image").alt = name;
  placesItem.querySelector(".card__title").textContent = name;
  placesItem.querySelector(".card__delete-button").addEventListener("click", () => resetPlacesItem(placesItem));

  placesList.append(placesItem);
}

// @todo: Функция удаления карточки
function resetPlacesItem(elem) {
  elem.remove();
}

// @todo: Вывести карточки на страницу
function renderPlacesItem() {
  initialCards.forEach(elem => addPlacesItem(elem.name, elem.link));
}

renderPlacesItem();