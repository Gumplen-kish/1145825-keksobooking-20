'use strict';
window.move = (function () {
  var SizeMainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    EDGE: 22
  };
  var SizeMap = {
    WIDTH_MIN: 0,
    WIDTH_MAX: 1200,
    HEIGHT_MIN: 130,
    HEIGHT_MAX: 630
  };
  var mapPinMain = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  return {
    onPinMouseMove: function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      /**
       * Функция изменения местоположения пина при движении мышью с зажатой клавишей
       * @param {Object} motionEvt событие при движении мышью
       */
      var onMouseMove = function (motionEvt) {
        motionEvt.preventDefault();

        var shift = {
          x: startCoords.x - motionEvt.clientX,
          y: startCoords.y - motionEvt.clientY
        };
        var currentX = window.pin.getMainPinPositionX(mapPinMain);
        var currentY = window.pin.getMainPinPositionY(mapPinMain);

        startCoords = {
          x: motionEvt.clientX,
          y: motionEvt.clientY
        };

        if (currentX > SizeMap.WIDTH_MAX) {
          mapPinMain.style.left = (SizeMap.WIDTH_MAX - Math.ceil(SizeMainPin.WIDTH / 2)) + 'px';
        } else if (currentX < SizeMap.WIDTH_MIN) {
          mapPinMain.style.left = (SizeMap.WIDTH_MIN - Math.ceil(SizeMainPin.WIDTH / 2)) + 'px';
        } else {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }

        if (currentY > SizeMap.HEIGHT_MAX) {
          mapPinMain.style.top = (SizeMap.HEIGHT_MAX - SizeMainPin.HEIGHT - SizeMainPin.EDGE) + 'px';
        } else if (currentY < SizeMap.HEIGHT_MIN) {
          mapPinMain.style.top = (SizeMap.HEIGHT_MIN - SizeMainPin.HEIGHT - SizeMainPin.EDGE) + 'px';
        } else {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }

        inputAddress.value = currentX + ', ' + currentY;
      };

      /**
       * При отпускании клавиши мыши удаляет слушатели событий
       * @param {Object} upEvt событие при отпускании клавиши мыши
       */
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  };
})();
