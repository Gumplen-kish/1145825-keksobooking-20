'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  var pinMainElement = document.querySelector('.map__pin--main');
  var formElement = document.querySelector('.ad-form');
  var fieldsetElements = document.querySelectorAll('.ad-form fieldset');

  /**
   * Функция блокировки полей в неактивном виде
   */
  var fieldsetDisabled = function () {
    fieldsetElements.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });
  };

  fieldsetDisabled();

  /**
   * Функция разблокировки полей в активном состоянии
   */
  var unFieldsetDisabled = function () {
    for (var i = 0; i < fieldsetElements.length; i++) {
      fieldsetElements[i].removeAttribute('disabled', 'disabled');
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
    if (evt.keyCode === 13) {
      activeMap();
    }
  };

  /**
   * Функция, которая рендерит пины, полученные от сервера
   * @param {Object} pinsData - объект данных, полученный от сервера, содержит в себе информацию о пинах
   */
  var onSuccessDownloadData = function (pinsData) {
    window.pins.render(pinsData);
  };

  /**
   * Функция вывода сообщения ошибки
   * @param {Object} errorMessage - сообщение об ошибке
   */
  var onError = function (errorMessage) {
    console.error(errorMessage);
  };

  /**
   * Функция активации карты
   */
  var activeMap = function () {
    window.backend.get(onSuccessDownloadData, onError);
    formElement.classList.remove('ad-form--disabled');
    unFieldsetDisabled();
    mapElement.classList.remove('map--faded');
    pinMainElement.removeEventListener('mousedown', onPressMouseLeft);
    pinMainElement.removeEventListener('keydown', onPressKeyboardEnter);
    pinMainElement.addEventListener('mousedown', window.move.onPinMouse);
    document.querySelector('.ad-form__reset').addEventListener('click', function () {
      deActiveMap();
    });
  };

  /**
   * Функция деактивации карты
   */
  var deActiveMap = function () {
    pinMainElement.classList.add('ad-form--disabled');
    fieldsetDisabled();
    window.validity.reset();
    mapElement.classList.add('map--faded');
    pinMainElement.addEventListener('mousedown', onPressMouseLeft);
    pinMainElement.addEventListener('keydown', onPressKeyboardEnter);
    pinMainElement.removeEventListener('mousedown', window.move.onPinMouse);
  };

  pinMainElement.addEventListener('mousedown', onPressMouseLeft);
  pinMainElement.addEventListener('keydown', onPressKeyboardEnter);
})();

