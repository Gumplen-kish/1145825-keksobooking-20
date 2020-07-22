'use strict';
window.validity = (function () {
  var MAJOR_FORM = document.querySelector('.ad-form');

  var typeHousePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var countRoomsGuests = {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [100]
  };
  var Time = {
    IN: MAJOR_FORM.querySelector('#timein'),
    OUT: MAJOR_FORM.querySelector('#timeout'),
  };
  var Count = {
    ROOMS: MAJOR_FORM.querySelector('#room_number'),
    GUESTS: MAJOR_FORM.querySelector('#capacity'),
  };
  var House = {
    TYPE: MAJOR_FORM.querySelector('#type'),
    PRICE: MAJOR_FORM.querySelector('#price'),
  };


  /**
   * валидация формы поля Количество комнат к Количеству гостей
   */
    Count.ROOMS.addEventListener('change', function () {
      Count.ROOMS.setCustomValidity('');
      if (!countRoomsGuests[Count.ROOMS.value].includes(Count.GUESTS.value)) {
        Count.ROOMS.setCustomValidity('Количество комнат должно быть больше или равно количеству гостей');
      } else {
        Count.GUESTS.setCustomValidity('');
      }
      Count.ROOMS.reportValidity();
    });
    /**
     * обратная проверка Колиство гостей к Количеству комнат
     */
    Count.GUESTS.addEventListener('change', function () {
      Count.GUESTS.setCustomValidity('');
      if (!countRoomsGuests[Count.ROOMS.value].includes(Count.GUESTS.value)) {
        Count.GUESTS.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат');
      } else {
        Count.ROOMS.setCustomValidity('');
      }
      Count.GUESTS.reportValidity();
    });
  /**
   * валидация формы по полю Время заезда и выезда
   */
  Time.IN.addEventListener('change', function () {
    Time.OUT.value = Time.IN.value;
  });

  Time.OUT.addEventListener('change', function () {
    Time.IN.value = Time.OUT.value;
  });
  /**
   * валидация формы по полям Тип жилья к Минимальной стоимости
   */
  House.TYPE.addEventListener('change', function () {
    var minPriceValue = typeHousePrice[House.TYPE.value];
    House.PRICE.min = minPriceValue;
    House.PRICE.placeholder = minPriceValue;
  });
})();
