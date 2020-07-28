'use strict';

(function () {
  var FILTERS = document.querySelector('.map__filters');
  var ads = [];
  var FilterPrice = {
    MIN: 10000,
    MAX: 50000,
  };

  var Housing = {
    TYPE: document.querySelector('#housing-type'),
    ROOMS: document.querySelector('#housing-rooms'),
    GUESTS: document.querySelector('#housing-guests'),
    PRICE: document.querySelector('#housing-price'),
    FEATURES: document.querySelector('#housing-features'),
  };

  FILTERS.addEventListener('change', window.debounce(function () {
    updatePins();
  }));

  /**
   * фильтрация пинов с последующей отрисовкой на странице пользователя
   */
  var updatePins = function () {

    var someFilters = ads.filter(function (ad) {
      if (Housing.TYPE.value === 'any') {
        var type = true;
      } else {
        type = ad.offer.type === Housing.TYPE.value;
      }

      if (Housing.ROOMS.value === 'any') {
        var rooms = true;
      } else {
        rooms = ad.offer.rooms === Number(Housing.ROOMS.value);
      }

      if (Housing.GUESTS.value === 'any') {
        var guests = true;
      } else {
        guests = ad.offer.guests === Number(Housing.GUESTS.value);
      }

      if (Housing.PRICE.value === 'any') {
        var price = true;
      } else if (Housing.PRICE.value === 'middle') {
        price = ad.offer.price >= FilterPrice.MIN && ad.offer.price <= FilterPrice.MAX;
      } else if (Housing.PRICE.value === 'low') {
        price = ad.offer.price < FilterPrice.MIN;
      } else if (Housing.PRICE.value === 'high') {
        price = ad.offer.price > FilterPrice.MAX;
      }

      var selectedCheckBoxes = Housing.FEATURES.querySelectorAll('input[name="features"]:checked');

      var checkedValues = Array.from(selectedCheckBoxes).map(function (it) {
        return it.value;
      });

      var matchedFeatures = checkedValues.filter(function (it) {
        return ad.offer.features.includes(it);
      });

      if (!checkedValues.length) {
        var features = true;
      } else {
        features = matchedFeatures.length === checkedValues.length;
      }

      return type && rooms && guests && price && features;
    });

    window.pins.render(someFilters);
  };

  /**
   * полученние данных с сервера
   * @param {Array} data - данные с сервера
   */
  var onSuccess = function (data) {
    ads = data;
    window.pin.render(data);
  };

  window.filter = onSuccess;

})();
