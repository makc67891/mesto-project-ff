import "../pages/index.css"; 
import { initialCards } from "./cards.js"; 
import { createPlacesItem, deletePlacesItem, likeCard } from "../components/card.js";
import { openModal, closeModal, clickClosed } from "../components/modal.js";

// DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// Кнопки и модальные окна
const editProfileButton = content.querySelector(".profile__edit-button");
const addNewCardButton = content.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addNewCardPopup = document.querySelector(".popup_type_new-card");
const lookImagePopup = document.querySelector(".popup_type_image");

// Формы
const formEditProfile = document.forms["edit-profile"];
const formAddNewCard = document.forms["new-place"];

// Для редактирование профиля
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");

// Для показа изображения 
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Вывести массив карточек на страницу
function renderPlacesItem() {
  initialCards.forEach(elem => {
    placesList.append(createPlacesItem(elem, deletePlacesItem, likeCard, lookImage))
  });
}

renderPlacesItem();

// Добавление класса анимации модальным окнам
const allPopups = document.querySelectorAll(".popup");
allPopups.forEach(elem => elem.classList.add("popup_is-animated"));

// Слушатель нажатия кнопки "редактировать профиль"
editProfileButton.addEventListener("click", function () {
  openModal(editProfilePopup);
  formEditProfile.name.value = profileTitle.textContent;
  formEditProfile.description.value = profileDescription.textContent;
  editProfilePopup.addEventListener("click", clickClosed);
});

// Изменение информации из формы
function editHandleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formEditProfile.name.value;
  profileDescription.textContent = formEditProfile.description.value;
  closeModal(editProfilePopup);
}

// Слушатель события формы редактирования профиля
formEditProfile.addEventListener("submit", editHandleFormSubmit);

// Слушатель нажатия кнопки "добавить новую карточку"
addNewCardButton.addEventListener("click", function () {
  openModal(addNewCardPopup);
  addNewCardPopup.addEventListener("click", clickClosed);
});

// Добавление новой карточки из формы
function addHandleFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: formAddNewCard["place-name"].value,
    link: formAddNewCard.link.value,
  };
  placesList.prepend(createPlacesItem(newCard, deletePlacesItem, likeCard, lookImage));
  formAddNewCard.reset();
  closeModal(addNewCardPopup);
}

// Слушатель события формы добавления новой карточки
formAddNewCard.addEventListener("submit", addHandleFormSubmit);

// Просмотр фотографии
function lookImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    openModal(lookImagePopup);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    lookImagePopup.addEventListener("click", clickClosed);
  }
}
