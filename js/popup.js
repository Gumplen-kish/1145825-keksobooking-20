'use strict';
(function () {
  /**
  * закрывает popup, удаляя button, удаляет обработчик события
  */
  var popupClose = function () {
    var oldPopup = document.querySelector('.map__card');
    oldPopup.remove();
    document.removeEventListener('keydown', onPressEsc);
  };

  /**
  * Вызывает функцию закрытия попапа при нажатии клавиши Esc
  * @param {Object} evt - хранит в себе событие нажатия
  */
  var onPressEsc = function (evt) {
    if (evt.keyCode === 27) {
      popupClose();
    }
  };

  /**
  * Вызывает функцию закрытия попапа при нажатии левой кнопкой мыши
  * @param {Object} evt - хранит в себе событие нажатия
  */
  var onClosePopupLeft = function (evt) {
    if (evt.button === 0) {
      popupClose();
    }
  };

  window.popup = {
    close: popupClose,
    onCloseLeft: onClosePopupLeft,
    onPressEsc: onPressEsc
  };
})();
