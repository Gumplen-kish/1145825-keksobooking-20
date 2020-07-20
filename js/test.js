var popupClose = function () {
  var popup = document.querySelector('.map__card');
  popup.classList.add('hidden');
  removeEventListener('keydown', onPopupEsc);
};
/**
 * Вызывает функцию закрытия попапа при нажатии клавиши Esc
 * @param {Object} evt - хранит в себе событие нажатия
 */
var onPopupEsc = function (evt) {
  if (evt.key === 27) {
    console.log('Закрываю попап');
    popupClose();
  }
};
var popupCloseClick = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      popupClose();
    });

window.addEventListener('keydown', onPressKeyboardEsc);
closeBtnCard.addEventListener('click', onCloseClick);
