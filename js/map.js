'use strict';
(function () {
  var MAP = document.querySelector('.map');
  var FILTERS = document.querySelector('.map__filters');
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var MAJOR_FORM = document.querySelector('.ad-form');
  /**
   *
   * @param {Object} occasion - Обэъект произошедшего события
   */
  var onPressMouseLeft = function(occasion) {
    if (occasion.which == 1) {
      activeMap()
    }
  }
  /**
   *
   * @param {Object} occasion - Обэъект произошедшего события
   */
  var onPressKeyboardEnter = function(occasion) {
    if (occasion.which == 13) {
      activeMap()
    }
  }
  /**
   * Функция активации карты
   */
  var activeMap = function() {
    window.pins.create();
    window.cards.create();
    window.form.activate(MAJOR_FORM,true);
    window.form.activate(FILTERS,true);
    MAJOR_FORM.classList.remove('ad-form--disabled');
    MAP.classList.remove('map--faded');
    PIN_MAIN.removeEventListener('mousedown', onPressMouseLeft);
    PIN_MAIN.removeEventListener('keydown', onPressKeyboardEnter);
  };
  PIN_MAIN.addEventListener('mousedown', onPressMouseLeft);
  PIN_MAIN.addEventListener('keydown', onPressKeyboardEnter);
})();
