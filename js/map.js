'use strict';
(function () {
  var MAP = document.querySelector('.map');
  var FILTERS = document.querySelector('.map__filters');
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var MAJOR_FORM = document.querySelector('.ad-form');
  
  /**
   *
   * @param {Object} evt - Обэъект произошедшего события
   */
  var onPressMouseLeft = function(evt) {
    if (evt.button === 0) {
      activeMap();
    }
  }
  /**
   *
   * @param {Object} evt - Обэъект произошедшего события
   */
  var onPressKeyboardEnter = function(evt) {
    if (evt.key === 13) {
      activeMap();
    }
  }
  /**
   * Функция активации карты
   */
  var activeMap = function() {
    window.pins.render(window.pins.generatedOffers(8));
    //window.cards.result();
    MAJOR_FORM.classList.remove('ad-form--disabled');
    MAP.classList.remove('map--faded');
    PIN_MAIN.removeEventListener('mousedown', onPressMouseLeft);
    PIN_MAIN.removeEventListener('keydown', onPressKeyboardEnter);
  };
  PIN_MAIN.addEventListener('mousedown', onPressMouseLeft);
  PIN_MAIN.addEventListener('keydown', onPressKeyboardEnter);
})();

