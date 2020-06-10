'use strict';
//задаем переменные
var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg','http://o0.github.io/assets/images/tokyo/hotel2.jpg','http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
//Блок определения координат
// Задаем координаты Y рандом от 130 до 630
var locationYGenerate = function getRandomIntInclusive(min, max) {
  min = Math.ceil('130');
  max = Math.floor('630');
  //Максимум и минимум включаются
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var y = locationYGenerate();
// Задаем координаты X рандом от 0 до 1200
var locationXGenerate = function getRandomIntInclusive(min, max) {
  min = Math.ceil('0');
  max = Math.floor('1200');
  //Максимум и минимум включаются
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var x = locationXGenerate();

//Генерируем Price
var PriceGenerate = function getRandomIntInclusive(min, max) {
  min = Math.ceil('10000');
  max = Math.floor('50000');
  //Максимум и минимум включаются
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Генерируем ROOMS
var RoomsGenerate = function getRandomIntInclusive(min, max) {
  min = Math.ceil('1');
  max = Math.floor('10');
  //Максимум и минимум включаются
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Генерируем кол-во гостей
var  GuestsGenerate = function getRandomIntInclusive(min, max) {
  min = Math.ceil('1');
  max = Math.floor('100');
  //Максимум и минимум включаются
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Получаем случайное число
var getRandomNumber = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};
//Получаем случайную строчку из массива
var getRandomElementFromArray = function (array) {
  return array[getRandomNumber(array.length - 1)];
};
//Удаляем класс у карты для её отображения.
var map = document.querySelector('.map');
map.classList.remove('map--faded');

({
  author: {
    avatar: 'img/avatars/user' + getRandomElementFromArray(AVATARS) + '.png'
  },
  offer: {
    title: getRandomElementFromArray(TITLES),
    adress: '600, 350',
    price: PriceGenerate(),
    type:  getRandomElementFromArray(TYPES),
    rooms: RoomsGenerate(),
    guests: GuestsGenerate(),
    checkin:  getRandomElementFromArray(TIMES),
    checkout: getRandomElementFromArray(TIMES),
    features: getRandomElementFromArray(FEATURES),
    description: getRandomElementFromArray(Description),
    photos: getRandomElementFromArray(PHOTOS)
  },
  location: x + ', ' + y
});
return adverts;

//Пробую добавить пин
var createPinsFragment = function (items) {
  // находим блок в который будем вставлять наши метки
    var pinsBlock = document.querySelector('.map__pins');
  // Находим шаблон метки которую потом будем вставлять
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    for (var i = 0; i < items.length; i++) {
      var htmlItem = renderPin(pinTemplate, items[i]);
      fragment.appendChild(htmlItem);
    }
    pinsBlock.appendChild(fragment);
};
