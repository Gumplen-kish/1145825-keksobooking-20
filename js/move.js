'use strict';
(function () {
  //var SizeMainPin = {
    //WIDTH: 65,
    //HEIGHT: 65,
    //TRIANGLE_HEIGHT: 22
  //};
  //var SizeMap = {
    //WIDTH_MIN: 0,
    //WIDTH_MAX: 1200,
    //HEIGHT_MIN: 130,
    //HEIGHT_MAX: 630
  //};
   //var inputAddress = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mousedown', function (evt) {
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
      setupMapPinMain.style.top = (setupMapPinMain.offsetTop - shift.y) + 'px';
      setupMapPinMain.style.left = (setupMapPinMain.offsetLeft - shift.x) + 'px';

      //inputAddress.value = X + ', ' + Y;
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
  });
})();
