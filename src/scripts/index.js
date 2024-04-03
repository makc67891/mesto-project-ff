import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createPlacesItem, deletePlacesItem, likeCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";

// DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// Кнопки и модальные окна
const editProfileButton = content.querySelector(".profile__edit-button");
const addNewCardButton = content.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addNewCardPopup = document.querySelector(".popup_type_new-card");
const lookImagePopup = document.querySelector(".popup_type_image");
const allPopups = document.querySelectorAll(".popup");

// Формы
const formEditProfile = document.forms["edit-profile"];
const formAddNewCard = document.forms["new-place"];

// Для редактирование профиля
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");

// Для показа изображения
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Массив функций карточки 
const cardFunctions = { deletePlacesItem, likeCard, lookImage }

// Вставка карточки append / prepend
function renderCard(item, method = "prepend") {
  const cardElement = createPlacesItem(item, cardFunctions);
  placesList[method](cardElement);
}

// Вывести массив карточек на страницу
function renderPlacesItem() {
  initialCards.forEach((elem) => {
    renderCard(elem, 'append');
  });
}

renderPlacesItem();

// Добавление класса анимации модальным окнам
allPopups.forEach((elem) => elem.classList.add("popup_is-animated"));

// Слушатель нажатия кнопки "редактировать профиль"
editProfileButton.addEventListener("click", function () {
  openModal(editProfilePopup);
  formEditProfile.name.value = profileTitle.textContent;
  formEditProfile.description.value = profileDescription.textContent;
});

// Изменение информации из формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formEditProfile.name.value;
  profileDescription.textContent = formEditProfile.description.value;
  closeModal(editProfilePopup);
}

// Слушатель события формы редактирования профиля
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

// Слушатель нажатия кнопки "добавить новую карточку"
addNewCardButton.addEventListener("click", function () {
  openModal(addNewCardPopup);
});

// Добавление новой карточки из формы
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: formAddNewCard["place-name"].value,
    link: formAddNewCard.link.value,
  };
  renderCard(newCard);
  formAddNewCard.reset();
  closeModal(addNewCardPopup);
}

// Слушатель события формы добавления новой карточки
formAddNewCard.addEventListener("submit", handleCardFormSubmit);

// Просмотр фотографии
function lookImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    openModal(lookImagePopup);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  }
}

// Слушатель закрытия модального окна по крестику или оверлею
allPopups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});
