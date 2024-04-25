// Изменение состояния кнопки
export function preloaderSaveButton(popup, flag = false) {
  const btn = popup.querySelector(".popup__button");
  if (flag) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
}