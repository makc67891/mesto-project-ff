import "../pages/index.css";
import { createPlacesItem, deletePlacesItem, likeCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { clearValidation, enableValidation } from "../components/validation.js";
import { preloaderSaveButton } from '../components/utils.js'
import { requestUserInfo, requestRenderCards, requestEditAvatar, requestUpdateUserInfo, requestAddNewCard, requestDeleteCard } from '../components/api.js'

// DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// Кнопки и модальные окна
const editProfileButton = content.querySelector(".profile__edit-button");
const addNewCardButton = content.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addNewCardPopup = document.querySelector(".popup_type_new-card");
const lookImagePopup = document.querySelector(".popup_type_image");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const confirmRemovePopup = document.querySelector(".popup_type_confirm");
const allPopups = document.querySelectorAll(".popup");

// Формы
const formEditProfile = document.forms["edit-profile"];
const formAddNewCard = document.forms["new-place"];
const formEditAvatar = document.forms["edit-avatar"];
const formConfirmRemoveCard = document.forms["confirm"];

// Для редактирование профиля
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const profileAvatar = content.querySelector(".profile__image");
let profileId = '';

// Для показа изображения
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Объект функций карточки
const cardFunctions = { deletePlacesItem, likeCard, lookImage, confirmRemove };

// Для удаления карточки
let cardForDelete = "";

// Конфиг валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error_active",
};

// Вызов функции валидации
enableValidation(validationConfig);

//////////////////////////////////////////////////////////////////////////

// Добавление класса анимации модальным окнам
allPopups.forEach((elem) => elem.classList.add("popup_is-animated"));

// Вставка карточки append / prepend
function renderCard(item, method = "prepend") {
  const cardElement = createPlacesItem(item, cardFunctions, profileId);
  placesList[method](cardElement);
}

//////////////////////////////////////////////////////////////////////////

// Слушатель нажатия кнопки "редактировать аватар"
profileAvatar.addEventListener("click", () => {
  openModal(editAvatarPopup);
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
});

// Изменение аватара из формы
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  preloaderSaveButton(editAvatarPopup, true);
  requestEditAvatar(formEditAvatar.link.value)
  .then((result) => {
    profileAvatar.style.backgroundImage = `url(${result.avatar})`;
    closeModal(editAvatarPopup);
    preloaderSaveButton(editAvatarPopup);
  })
  .catch((err) => {
    console.log(err);
  });
}

// Слушатель события формы редактирования аватара
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

//////////////////////////////////////////////////////////////////////////

// Слушатель нажатия кнопки "редактировать профиль"
editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopup);
  formEditProfile.name.value = profileTitle.textContent;
  formEditProfile.description.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
});

// Изменение информации из формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  preloaderSaveButton(editProfilePopup, true);
  const newInfo = {
    name: formEditProfile.name.value,
    about: formEditProfile.description.value
  }
  requestUpdateUserInfo(newInfo.name, newInfo.about)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(editProfilePopup);
      preloaderSaveButton(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Слушатель события формы редактирования профиля
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

//////////////////////////////////////////////////////////////////////////

// Слушатель нажатия кнопки "добавить новую карточку"
addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardPopup);
  formAddNewCard.reset();
  clearValidation(formAddNewCard, validationConfig);
});

// Добавление новой карточки из формы
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  preloaderSaveButton(addNewCardPopup, true);
  const newCard = {
    name: formAddNewCard["place-name"].value,
    link: formAddNewCard.link.value,
  };
  requestAddNewCard(newCard.name, newCard.link)
    .then((result) => {
      renderCard(result);
      closeModal(addNewCardPopup);
      preloaderSaveButton(addNewCardPopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Слушатель события формы добавления новой карточки
formAddNewCard.addEventListener("submit", handleCardFormSubmit);

//////////////////////////////////////////////////////////////////////////

// Открытие модального окна подтверждения удаления
function confirmRemove(elem) {
  cardForDelete = elem;
  openModal(confirmRemovePopup);
}

// Удаление карточки после подтверждения 
function handleConfirmFormSubmit(evt){
  evt.preventDefault();
  requestDeleteCard(cardForDelete)
    .then(() => {
      deletePlacesItem(cardForDelete)
      closeModal(confirmRemovePopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Слушатель события формы подтверждения удаления
formConfirmRemoveCard.addEventListener("submit", handleConfirmFormSubmit);

//////////////////////////////////////////////////////////////////////////

// Просмотр фотографии
function lookImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    openModal(lookImagePopup);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  }
}

//////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////

Promise.all([requestUserInfo(), requestRenderCards()]).then(
  ([userInfo, cards]) => {
    profileId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    cards.forEach((card) => {
      renderCard(card, "append");
    });
  }
).catch((err) => {
  console.log(err);
});