'use strict';
window.pins = (function () {
  var ADSAMOUNT = 8;
  var Types = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var Rooms = {
    MIN: 1,
    MAX: 6
  };
  var Guests = {
    MIN: 1,
    MAX: 10
  };
  var times = ['12:00', '13:00', '14:00'];
  var Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var Titles = [
    'Хорошая квартира',
    'Хижина, как у лесника',
    'Квартира, как у Шейха',
    'Квартира, как у бабушки',
    'Квартира - Хрущевка',
    'Квартира - Сталинка',
    'Квартира мечты',
    'Квартира - на сутки пойдет'
  ];
  var Description = [
    'Единственный минус - капает кран',
    'Холодильник с замком, а так всё хорошо',
    'Есть лежак из досок',
    'Пахнет плесенью в одной из комнат',
    'Только одно окно, вид на любителя',
    'Один минус - унитаз золотой',
    'Телевизор на всю стену',
    'Соседи ругаются, а иногда просятся к вам в гости'
  ];
  var MapCoordinates = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };
  var Photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var PIN_OFFSET_X = 50;
  var PIN_OFFSET_Y = 70;

  /**
   * @param {number} arr - массив
   * @length - длинна массива
   * @return - возвращает случайную строку из массива
   */
  var getRandomElementFromArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  // Блок определения координат
  /**
   * Функция выбора рандомного числа в диапозоне, где максимум и минимум включены
   * @param {number} min - минимальное число диапозона
   * @param {number} max - максимальное число диапозона
   * @return {number} - рандомное число
   */
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  /**
   * Функция создания масива пинов
   * @param {number} adsamount - Количество пинов
   * @return {number} - Возвращает готовый массив пинов
   */
  var getListOfOffers = function (adsamount) {
    var offers = [];
    for (var i = 0; i < adsamount; i++) {
      offers[i] = createOffer(i + 1);
    }
    return offers;
  };
  /**
   * Генерация объекта
   * @param {number} offerNumber - индекс пина
   * @return {Array} - Готовый объект с данными для пина
   */
  var createOffer = function (offerNumber) {
    var locationX = getRandomIntInclusive(MapCoordinates.MIN_X, MapCoordinates.MAX_X);
    var locationY = getRandomIntInclusive(MapCoordinates.MIN_Y, MapCoordinates.MAX_Y);
    var offer = {
      author: {
        avatar: 'img/avatars/user0' + (offerNumber) + '.png'
      },
      offer: {
        title: getRandomElementFromArray(Titles),
        address: locationX + ', ' + locationY,
        price: getRandomIntInclusive(1000, 10000),
        type: getRandomElementFromArray(Types),
        rooms: getRandomIntInclusive(Rooms.MIN, Rooms.MAX),
        guests: getRandomIntInclusive(Guests.MIN, Guests.MAX),
        checkin: getRandomElementFromArray(times),
        checkout: getRandomElementFromArray(times),
        features: getRandomElementFromArray(Features),
        description: getRandomElementFromArray(Description),
        photos: getRandomElementFromArray(Photos)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return offer;
  };
  /**
   * задаем расположение пина(ов)
   * @param {Array} offer - массив с данными
   * @return - возвращает готовый пин
   */
  var createPin = function (offer) {
    var pinTemplate = document.querySelector('#pin')
      .content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    var pinX = offer.location.x - PIN_OFFSET_X;
    var pinY = offer.location.y - PIN_OFFSET_Y;
    pin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    var pinAvatar = pin.querySelector('img');
    pinAvatar.src = offer.author.avatar;
    pinAvatar.alt = offer.offer.title;
    pin.addEventListener ('mousedown', function(evt) {
      if (evt.button === 0 ) {
        window.cards.pushCard;
      }
    });
  return pin;
  }
  /**
   * Добавляем пины в разметку
   * @param {Array} offers - массивы с данными
   */
  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < offers.length; j++) {
      fragment.appendChild(createPin(offers[j]));
    }
    var pins = document.querySelector('.map__pins');
    pins.appendChild(fragment);
  };
  return {
    render: renderPins,
    generatedOffers: getListOfOffers
  };
})();
