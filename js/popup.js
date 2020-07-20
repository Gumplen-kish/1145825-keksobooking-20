'use strict';
window.popup = (function () {
  var CLOSE_POPUP = document.querySelector('popup__close');
  /**
   * закрывает popup, навешивая класс hidden, удаляет обработчик события
   */
  var popupClose = function () {
    var popup = document.querySelector('.map__card');
    popup.classList.add('hidden');
    removeEventListener('keydown', onPopupEsc);
    removeEventListener('click', onCloseClick);
  };

  /**
   * Вызывает функцию закрытия попапа при нажатии клавиши Esc
   * @param {Object} evt - хранит в себе событие нажатия
   */
  var onPopupEsc = function (evt) {
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


  CLOSE_POPUP.addEventListener('mousedown', onClosePopupLeft);
  window.addEventListener('keydown', onPopupEsc);
})();

