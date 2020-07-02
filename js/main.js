'use strict';
var ADSAMOUNT = 8;
var TYPES = {
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
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLES = [
  'Хорошая квартира',
  'Хижина, как у лесника',
  'Квартира, как у Шейха',
  'Квартира, как у бабушки',
  'Квартира - Хрущевка',
  'Квартира - Сталинка',
  'Квартира мечты',
  'Квартира - на сутки пойдет'
];
var DESCRIPTION = [
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
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_OFFSET_X = 50;
var PIN_OFFSET_Y = 70;
// Удаляем класс у карты для её отображения.
var map = document.querySelector('.map');
map.classList.remove('map--faded');
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
 * @param {number} ADSAMOUNT - Количество аватаров и максимальное количество пинов
 * @return {number} - Возвращает рандомное число
 */
var getListOfOffers = function () {
  var offers = [];
  for (var i = 0; i < ADSAMOUNT; i++) {
    offers[i] = createOffer(i + 1);
  }
  return offers;
};
/**
 * Генерация массива моков из объектов
 * @param {number} offerNumber - количество элеметов массива
 * @return {Array} - Готовый массив с данными для пина
 */
var createOffer = function (offerNumber) {
  var locationX = getRandomIntInclusive(MapCoordinates.MIN_X, MapCoordinates.MAX_X);
  var locationY = getRandomIntInclusive(MapCoordinates.MIN_Y, MapCoordinates.MAX_Y);
  var offer = {
    author: {
      avatar: 'img/avatars/user0' + (offerNumber) + '.png'
    },
    offer: {
      title: getRandomElementFromArray(TITLES),
      address: locationX + ', ' + locationY,
      price: 1000,
      type: getRandomElementFromArray(TYPES),
      rooms: getRandomIntInclusive(Rooms.MIN, Rooms.MAX),
      guests: getRandomIntInclusive(Guests.MIN, Guests.MAX),
      checkin: getRandomElementFromArray(TIMES),
      checkout: getRandomElementFromArray(TIMES),
      features: getRandomElementFromArray(FEATURES),
      description: getRandomElementFromArray(DESCRIPTION),
      photos: getRandomElementFromArray(PHOTOS)
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
  return pin;
};
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

/*модуль3 задание3 */
/**
 * DOM элемент по шаблону #card
 * @param {Array} card - массив с данными для карточки
 * @return {Object} cardElement - объект с данными из массива
 */
var generateCard = function(card) {
  var cardTemplate = document.querySelector('#card')
  .content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
  cardElement.querySelector('.popup__text--price').insertAdjacentHTML('beforeend', '&#x20bd;<span>/ночь</span>');
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').src = card.offer.photos;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  return cardElement;
};
/**
 * Добавляем информацию для карт
 * @param {*} offers - массив с данными пинов
 */
var pushCard = function(offers) {
  var fragment = document.createDocumentFragment();
  var listElement = document.querySelector('.map__pins');
  offers.forEach(function(card) {
    fragment.appendChild(renderPin(card));
  });
  listElement.appendChild(fragment);
};
var offers = getListOfOffers();
renderPins(offers);
pushCard(offers[0]);
