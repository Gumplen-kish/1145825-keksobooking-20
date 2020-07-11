'use strict';
var сontrolMap = function () {
  var MAP = document.querySelector('.map');
  var FILTERS = document.querySelector('.map__filters');
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var MAJOR_FORM = document.querySelector('.ad-form');
  /**
   *
   * @param {Object} event - Обэъект произошедшего события
   */
  var pressMouseLeft = function(event) {
    if (event.which == 1) {
      activeMap();
    }
  }
  /**
   *
   * @param {Object} event - Обэъект произошедшего события
   */
  var pressKeyboardEnter = function(event) {
    if (event.which == 13) {
      activeMap();
    }
  }
  /**
   * Функция активации карты
   */
  var activeMap = function() {
    window.main.createPin();
    window.form.activate(MAJOR_FORM,true);
    window.form.activate(FILTERS,true);
    MAJOR_FORM.classList.remove('ad-form--disabled');
    MAP.classList.remove('map--faded');
    PIN_MAIN.removeEventListener('mousedown', pressMouseLeft);
    PIN_MAIN.removeEventListener('keydown', pressKeyboardEnter);
  };
};
