'use strict';
(function () {
  /**
  * DOM элемент по шаблону #card
  * @param {Object} card - объект с данными для карточки
  * @return {Object} - html разметка карточки
  */
  var generateCard = function (card) {
    var oldPopup = document.querySelector('.map__card');
    if (oldPopup) {
      oldPopup.remove();
    }

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
    var cardElementFeatures = function () {
      var elementFeatures = cardElement.querySelectorAll('.popup__features');
      elementFeatures.forEach(function (feature) {
        console.log(feature);
      });
    };
    cardElementFeatures();
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    var closePopup = cardElement.querySelector('.popup__close');
    closePopup.addEventListener('click', window.popup.onCloseLeft);
    window.addEventListener('keydown', window.popup.onPressEsc);
    return cardElement;
  };

  /**
  * Показываем карточку обьявления
  * @param {Object} offer - информация обьявления
  */
  var pushCard = function (offer) {
    var listElement = document.querySelector('.map__pins');
    var card = generateCard(offer);
    listElement.appendChild(card);
  };

  window.cards = {
    push: pushCard
  };
})();
