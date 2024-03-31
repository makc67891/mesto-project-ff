import "../pages/index.css"; // добавили импорт главного файла стилей
import { initialCards } from "./cards.js"; // импорт массива карточек

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
function createPlacesItem(elem, functionDelete) {
  const placesItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  const cardTitle = placesItem.querySelector(".card__title");
  const deleteCardButton = placesItem.querySelector(".card__delete-button");
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  cardTitle.textContent = elem.name;

  deleteCardButton.addEventListener("click", () => functionDelete(placesItem));

  return placesItem;
}

// @todo: Функция удаления карточки
function deletePlacesItem(elem) {
  elem.remove();
}

// @todo: Вывести карточки на страницу
function renderPlacesItem() {
  initialCards.forEach((elem) =>
    placesList.append(createPlacesItem(elem, deletePlacesItem))
  );
}

renderPlacesItem();

// анимация
// const popups = document.querySelectorAll('.popup');
// popups.forEach((elem) => {
//   console.log(elem);
//   elem.classList.toggle('popup_is-animated');
// })


// const editProfileButton = content.querySelector(".profile__edit-button");
const addNewCardButton = content.querySelector(".profile__add-button");
// const editProfilePopup = document.querySelector(".popup_type_edit");
const addNewCardPopup = document.querySelector(".popup_type_new-card");
const lookImagePopup = document.querySelector('.popup_type_image');

// Редактирование профиля
// editProfileButton.addEventListener("click", function () {
//   openModal(editProfilePopup);
//   console.log('click edit');
  // const profileTitle = document.querySelector('.profile__title');
  // const profileDescription = document.querySelector('.profile__description');
  // const formEditProfile = document.forms['edit-profile'];
  // const nameInput = formEditProfile.name;
  // const descriptionInput = formEditProfile.description;
  
  // nameInput.value = profileTitle.textContent;
  // descriptionInput.value = profileDescription.textContent;
  
  // function handleFormSubmit(evt) {
  //   evt.preventDefault();
  //   profileTitle.textContent = nameInput.value;
  //   profileDescription.textContent = descriptionInput.value;
  //   closeModal(editProfilePopup);
  // }

  // formEditProfile.addEventListener('submit', handleFormSubmit);
// });

// Добавление новой карточки
addNewCardButton.addEventListener("click", function () {
  openModal(addNewCardPopup);
  console.log('click add');
  // const formAddNewCard = document.forms['new-place'];

  // function handleFormSubmit(evt) {
  //   evt.preventDefault();
  //   const newCard = {
  //     name: formAddNewCard['place-name'].value,
  //     link: formAddNewCard.link.value
  //   };
  //   console.log(newCard);
  //   placesList.prepend(createPlacesItem(newCard, deletePlacesItem));
  //   formAddNewCard.reset();
  //   closeModal(addNewCardPopup);
  // }

  // formAddNewCard.addEventListener('submit', handleFormSubmit);
});

// Просмотр фотографии
placesList.addEventListener('click', function(evt){
  if (evt.target.classList.contains("card__image")) {
    openModal(lookImagePopup);
  }
})

// Функция открытия модального окна
// function openModal(popup) {
  // console.log('открыл');
  // popup.classList.add("popup_is-opened");
  // document.addEventListener("keydown", function (evt) {
  //   if (evt.keyCode === 27) {
  //     closeModal(popup);
  //     console.log('Esc');
  //   }
  // });
  // popup.addEventListener("click", function (evt) {
  //   if (evt.target.classList.contains("popup__close")) {
  //     closeModal(popup);
  //     console.log('X');
  //   }
    // if (evt.target === evt.currentTarget) {
    //   closeModal(popup);
    //   console.log('overlay');
    // }
  // });
// }

// Функция закрытия модального окна 
// function closeModal(evt) {
//   evt.classList.remove("popup_is-opened");
//   console.log('закрыл');
// }





const editProfileButton = content.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");

// Редактирование профиля
editProfileButton.addEventListener("click", function () {
  openModal(editProfilePopup);
  console.log('click edit');
});

// Функция открытия модального окна
function openModal(popup) {
  console.log('открыл');
  popup.classList.add("popup_is-opened");

  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
      console.log('X');
    }
  });
}

// Функция закрытия модального окна 
function closeModal(evt) {
  evt.classList.remove("popup_is-opened");
  console.log('закрыл');
}
