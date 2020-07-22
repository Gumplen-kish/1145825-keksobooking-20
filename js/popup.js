'use strict';
window.popup = (function () {

  /**
   * закрывает popup, удаляя button, удаляет обработчик события
   */
  var popupClose = function () {
    var popup = document.querySelector('.map__card');
    popup.remove();
    document.removeEventListener('keydown', onPressEsc);
  };

  /**
   * Вызывает функцию закрытия попапа при нажатии клавиши Esc
   * @param {Object} evt - хранит в себе событие нажатия
   */
  var onPressEsc = function (evt) {
    if (evt.key === 27) {
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


  return {
    close: popupClose,
    onCloseLeft: onClosePopupLeft,
    onPressEsc: onPressEsc
  };
})();
