'use strict';
(function () {
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var SizeMainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    TRIANGLE_HEIGHT: 22
  };
  var SizeMap = {
    WIDTH_MIN: 0,
    WIDTH_MAX: 1200,
    HEIGHT_MIN: 130,
    HEIGHT_MAX: 630
  };

  addressInput.value = '155, 150';

  var onPinMouseMove = function (evt) {
    var mapPinMain = PIN_MAIN;
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Измененяет местоположение пина при движении мышью с зажатой клавишей
     * @param {Object} moveEvt событие при движении мышью
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var xCoord = moveEvt.clientX;
      var yCoord = moveEvt.clientY;
      var xPointCoord = mapPinMain.offsetLeft - shift.x;
      var yPointCoord = mapPinMain.offsetTop - shift.y;

      if (xCoord >= SizeMap.WIDTH_MAX) {
        mapPinMain.style.left = (SizeMap.WIDTH_MAX - Math.ceil(SizeMainPin.WIDTH / 2)) + 'px';
      } else if (yCoord <= SizeMap.WIDTH_MIN) {
        mapPinMain.style.left = (SizeMap.WIDTH_MIN - Math.ceil(SizeMainPin.WIDTH / 2)) + 'px';
      } else {
        mapPinMain.style.left = xPointCoord + 'px';
      }

      if (yCoord >= SizeMap.HEIGHT_MAX) {
        mapPinMain.style.top = (SizeMap.HEIGHT_MAX - SizeMainPin.HEIGHT - SizeMainPin.TRIANGLE_HEIGHT) + 'px';
      } else if (yCoord <= SizeMap.HEIGHT_MIN) {
        mapPinMain.style.top = (SizeMap.HEIGHT_MIN - SizeMainPin.HEIGHT - SizeMainPin.TRIANGLE_HEIGHT) + 'px';
      } else {
        mapPinMain.style.top = yPointCoord + 'px';
      }

      addressInput.value = xPointCoord + ', ' + yPointCoord;
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
  };

  window.move = {
    onPinMouse: onPinMouseMove
  };
})();
