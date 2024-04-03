// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createPlacesItem(elem, functions) {
  const placesItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  const cardTitle = placesItem.querySelector(".card__title");
  const cardLike = placesItem.querySelector('.card__like-button');
  const deleteCardButton = placesItem.querySelector(".card__delete-button");
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  cardTitle.textContent = elem.name;

  cardLike.addEventListener("click", functions.likeCard);
  cardImage.addEventListener("click", functions.lookImage);
  deleteCardButton.addEventListener("click", () => functions.deletePlacesItem(placesItem));

  return placesItem;
}

// Функция удаления карточки
export function deletePlacesItem(elem) {
  elem.remove();
}

// Функция добавления / удаления лайка
export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
