'use strict';
(function () {
  var url = 'https://javascript.pages.academy/keksobooking/data';
  var onError = function (message) {
    console.error(message);
  };
  var onSuccess = function (data) {
    var announcements = data;
    console.log(announcements);
  };

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  console.log(xhr);
  xhr.addEventListener('load', function () {
    var error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });
  xhr.timeout = 10000;

  xhr.open('GET', url);
  xhr.send();
})();
