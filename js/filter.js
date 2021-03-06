'use strict';
(function () {
  var onChangeHandler = window.util.debounce(function () {
    var houseType = selectHouseType.value;
    var housePrice = selectHousePrice.value;
    var houseRooms = selectHouseRooms.value.toString();
    var houseGuests = selectHouseGuests.value.toString();

    var filteredArray = function (element) {
      var isType = true;
      var isRooms = true;
      var isGuests = true;
      var isPrice = true;
      var isFeatures = true;

      var checkedFeatures = document.querySelectorAll('input[name="features"]:checked');
      if (checkedFeatures.length) {
        checkedFeatures.forEach(function (feature) {
          if (element.offer.features.indexOf(feature.value) === -1) {
            isFeatures = false;
          }
        });
      }
      if (houseType !== ANY) {
        isType = element.offer.type === houseType;
      }
      if (houseRooms !== ANY) {
        isRooms = element.offer.rooms.toString() === houseRooms;
      }
      if (houseGuests !== ANY) {
        isGuests = element.offer.guests.toString() === houseGuests;
      }
      if (housePrice !== ANY) {
        var elementPrice = element.offer.price.toString();
        var price;
        if (elementPrice < window.data.price.min) {
          price = HousePriceValue.LOW;
        }
        if (elementPrice > window.data.price.max) {
          price = HousePriceValue.HIGH;
        }
        if (elementPrice < window.data.price.max && elementPrice > window.data.price.min) {
          price = HousePriceValue.MIDDLE;
        }
        isPrice = price === housePrice;
      }
      return isType && isRooms && isGuests && isPrice && isFeatures;
    };
    render(loadedPins.filter(filteredArray));
  });

})();
