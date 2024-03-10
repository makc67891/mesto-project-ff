// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
function createPlacesItem(name, link) {
  const placesItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  placesItem.querySelector(".card__title").textContent = name;
  placesItem.querySelector(".card__delete-button").addEventListener("click", () => deletePlacesItem(placesItem));
  return placesItem;
}

// @todo: Функция удаления карточки
function deletePlacesItem(elem) {
  elem.remove();
}

// @todo: Вывести карточки на страницу
function renderPlacesItem() {
  initialCards.forEach(elem => placesList.append(createPlacesItem(elem.name, elem.link)));
}

renderPlacesItem(); 