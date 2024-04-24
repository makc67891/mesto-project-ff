import { requestAddLike, requestRemoveLike } from '../components/api.js'

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createPlacesItem(elem, functions, profileId) {
  const placesItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  const cardTitle = placesItem.querySelector(".card__title");
  const cardLike = placesItem.querySelector('.card__like-button');
  const likeCounter = placesItem.querySelector('.card__like-counter')
  const deleteCardButton = placesItem.querySelector(".card__delete-button");

  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  cardTitle.textContent = elem.name;
  likeCounter.textContent = elem.likes.length;
  placesItem.setAttribute('id', elem._id)
  cardLike.addEventListener("click", functions.likeCard);
  cardImage.addEventListener("click", functions.lookImage);
  deleteCardButton.addEventListener("click", () => functions.confirmRemove(placesItem));
  showDeleteButton(elem, deleteCardButton);

  if(elem.likes.some((like) => like._id === profileId)){
    cardLike.classList.add('card__like-button_is-active')
  }

  return placesItem;
}

// Функция удаления карточки
export function deletePlacesItem(elem) {
  elem.remove();
}

// Функция добавления / удаления лайка
export function likeCard(evt) {
  const item = evt.target.closest('.places__item');
  const likeCounter = item.querySelector('.card__like-counter')
  if (evt.target.classList.contains("card__like-button" && "card__like-button_is-active")) {
    requestRemoveLike(item)
      .then((result) => {
        evt.target.classList.remove("card__like-button_is-active");
        likeCounter.textContent = result.likes.length;
      })
  } else {
    requestAddLike(item)
    .then((result) => {
      evt.target.classList.add("card__like-button_is-active");
      likeCounter.textContent = result.likes.length;
    })
  }
}

// Функция показа кнопки удаления
function showDeleteButton(elem, deleteButton){
  if(elem.owner._id === '984c177f863031700b1bd5eb'){
    deleteButton.style.display = 'block'
  }
}