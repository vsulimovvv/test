window.addEventListener('DOMContentLoaded', () => {
  // * ===== Mask input
  $('input[type="tel"]').mask('+7 (999) 999 - 99 - 99');

  const specificationsMore = document.querySelector(
    '[data-element="specifications__more"]'
  );
  const specificationsLines = document.querySelectorAll(
    '[data-element="specifications__line"]'
  );

  if (specificationsMore && specificationsLines.length > 5)
    specificationsMoreInit();

  function specificationsMoreInit() {
    specificationsMore.addEventListener('click', toggleSpecifications);

    function toggleSpecifications() {
      if (this.classList.contains('specifications__more_active')) {
        this.classList.remove('specifications__more_active');
        this.innerHTML = 'Показать все характеристики';
        for (let i = 5; i < specificationsLines.length; i++) {
          specificationsLines[i].classList.add('specifications__line_hidden');
        }
      } else {
        this.classList.add('specifications__more_active');
        this.innerHTML = 'Свернуть';
        for (let i = 0; i < specificationsLines.length; i++) {
          specificationsLines[i].classList.remove(
            'specifications__line_hidden'
          );
        }
      }
    }
  }

  const header = document.querySelector('[data-element="header"]');

  if (header) headerInit();

  function headerInit() {
    const close = header.querySelector('[data-element="header__close"]');
    const burger = header.querySelector('[data-element="header__burger"]');

    const html = document.getElementsByTagName('html')[0];

    burger.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);

    function openMenu() {
      header.classList.add('header_active');
      html.classList.add('html_no-scroll-mob');
    }

    function closeMenu() {
      header.classList.remove('header_active');
      html.classList.remove('html_no-scroll-mob');
    }
  }

  const map = document.querySelector('#contacts__map');

  if (map) setTimeout(mapInit, 0);

  function mapInit() {
    loadMap();

    function loadMap() {
      const mapScript = document.createElement('script');

      mapScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      document.body.appendChild(mapScript);

      mapScript.addEventListener('load', function () {
        ymaps.ready(contactMapInit);
      });
    }

    function contactMapInit() {
      let myMap;
      const zoom = 14;
      myMap = new ymaps.Map(
        'contacts__map',
        {
          center: JSON.parse(map.getAttribute('data-coords')),
          zoom: zoom,
        },
        { balloonPanelMaxMapArea: 0, autoFitToViewport: 'always' }
      );

      myMap.behaviors.disable('scrollZoom');

      createPlacemark();

      function createPlacemark() {
        const coords = JSON.parse(map.getAttribute('data-coords'));
        const title = map.getAttribute('data-placemark-title');
        const placemark = new ymaps.Placemark(
          coords,
          { iconCaption: title },
          {}
        );
        myMap.geoObjects.add(placemark);
      }
    }
  }

  function someTabs(headerSelector, tabSelector, contentSelector, activeClass) {
    const header = document.querySelectorAll(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);
    header.forEach((el) => {
      if (el) {
        hideTabContent();
        showTabContent();
        function hideTabContent() {
          content.forEach((item) => {
            item.classList.remove('active');
          });
          tab.forEach((item) => {
            item.classList.remove(activeClass);
          });
        }
        function showTabContent(i = 0) {
          content[i].classList.add('active');
          tab[i].classList.add(activeClass);
        }
        header.forEach((item) => {
          if (item) {
            item.addEventListener('click', (e) => {
              const target = e.target;
              if (target.classList.contains(tabSelector.replace(/\./, ''))) {
                tab.forEach((item, i) => {
                  if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  someTabs(
    '.equipment-tabs',
    '.equipment-tabs__btn',
    '.equipment-tabs__content',
    'active'
  );
  someTabs(
    '.payment-tabs',
    '.payment-tabs__btn',
    '.payment-tabs__content',
    'active'
  );
});
