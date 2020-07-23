'use strict';
(function () {
  var MAP = document.querySelector('.map');
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var MAJOR_FORM = document.querySelector('.ad-form');
  var MAJOR_FORM_ELEMENT = document.querySelectorAll('.ad-form__element');
  /**
  * Функция блокировки полей в неактивном виде
  */
  var fieldsetDisabled = function () {
    for (var i = 0; i < MAJOR_FORM_ELEMENT.length; i++) {
      MAJOR_FORM_ELEMENT[i].setAttribute('disabled', 'disabled');
    }
  };
  fieldsetDisabled();
  /**
  * Функция разблокировки полей в активном состоянии
  */
  var unFieldsetDisabled = function () {
    for (var i = 0; i < MAJOR_FORM_ELEMENT.length; i++) {
      MAJOR_FORM_ELEMENT[i].removeAttribute('disabled', 'disabled');
    }
  };


  /**
  *
  * @param {Object} evt - Обэъект произошедшего события
  */
  var onPressMouseLeft = function (evt) {
    if (evt.button === 0) {
      activeMap();
    }
  };
  /**
  *
  * @param {Object} evt - Обэъект произошедшего события
  */
  var onPressKeyboardEnter = function (evt) {
    if (evt.key === 13) {
      activeMap();
    }
  };
  /**
  * Функция активации карты
  */
  var activeMap = function () {
    window.pins.render(window.pins.generatedOffers(8));
    MAJOR_FORM.classList.remove('ad-form--disabled');
    unFieldsetDisabled();
    MAP.classList.remove('map--faded');
    PIN_MAIN.removeEventListener('mousedown', onPressMouseLeft);
    PIN_MAIN.removeEventListener('keydown', onPressKeyboardEnter);
    PIN_MAIN.addEventListener('mousedown', window.move.onPinMouseMove);
  };
  PIN_MAIN.addEventListener('mousedown', onPressMouseLeft);
  PIN_MAIN.addEventListener('keydown', onPressKeyboardEnter);
})();

