'use strict';
(function () {
  var TIMEOUT = 10000;
  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking'
  };

  /**
   * Возвращает XHR объект
   * @param {Object} onSuccess - действия при получении данных с сервера
   * @param {function} onError -
   * @return {Object} - объект xhr
   */
  var settingXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  /**
   * Функция, которая выполняет запрос к серверу
   * @param {Object} onSuccess - действие при успешном запросе
   * @param {Object} onError - действие при ошибке
   */
  var getData = function (onSuccess, onError) {
    var xhr = settingXhr(onSuccess, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  /**
   * Функция отправки данных на сервер
   * @param {Object} onSuccess - действие при успешной отправке
   * @param {Object} onError - действие при ошибке
   * @param {Object} data - обьект данных, который мы отправляем
   */
  var saveData = function (onSuccess, onError, data) {
    var xhr = settingXhr(onSuccess, onError);
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    get: getData,
    save: saveData
  };
})();
