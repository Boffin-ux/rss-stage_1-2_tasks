export default class RootMarkup {
    renderHeader() {
        const createHeader = document.createElement('header');
        createHeader.classList.add('header');
        createHeader.innerHTML = `
          <div class="header__wrap">
            <a href="/" class="header__logo" aria-label="logo">
              <div class="header__img link"></div>
              <h1 class="header__title">Laptop-Store</h1>
            </a>
            <div class="header__cart cart">
              <div class="cart__img link"></div>
              <span class="cart__counter">0</span>
            </div>
          </div>
        `;
        document.body.appendChild(createHeader);
    }

    renderMain() {
        const createMain = document.createElement('main');
        createMain.classList.add('main');
        createMain.innerHTML = `
          <section class="product">
            <div class="product__wrap container">
              <div class="product__filter filter">
              <form class="search-form">
                <input class="search-form__input" type="search" placeholder="Найти">
                <div class="search-form__buttons">
                    <span class="search-form__clear icon"></span>
                    <span class="search-form__icon icon"></span>
                </div>
              </form>
                <div class="filter__group">
                  <h2 class="filter__title">Фильтры</h2>
                  <div class="sort">
                    <div class="sort__dropdown dropdown">
                      <div class="dropdown__header">
                        <span class="dropdown__title" data-sort="price-dic">Сортировать:</span>
                        <span class="dropdown__icon icon"></span>
                      </div>
                      <ul class="dropdown__list list--hidden">
                        <li class="dropdown__item" data-sort="a-z">по названию (от А до Я)</li>
                        <li class="dropdown__item" data-sort="z-a">по названию (от Я до А)</li>
                        <li class="dropdown__item" data-sort="price-inc">по возрастанию цены</li>
                        <li class="dropdown__item" data-sort="price-dic">по убыванию цены</li>
                      </ul>
                    </div>
                  </div>
                  <div class="popular">
                    <label class="popular__label">
                      <input type="checkbox" class="popular__checkbox">
                      <span class="popular__box"></span>
                      <span class="popular__item-title">Только популярные</span>
                    </label>
                  </div>
                  <div class="slider"></div>
                  <div class="brand">
                    <div class="brand__dropdown dropdown">
                      <div class="dropdown__header">
                        <span class="dropdown__title">Производитель</span>
                        <span class="dropdown__icon icon"></span>
                      </div>
                    </div>
                  </div>
                  <div class="color">
                    <div class="color__dropdown dropdown">
                      <div class="dropdown__header">
                        <span class="dropdown__title">Цвет</span>
                        <span class="dropdown__icon icon"></span>
                      </div>
                    </div>
                  </div>
                  <div class="screen">
                    <div class="screen__dropdown dropdown">
                      <div class="dropdown__header">
                        <span class="dropdown__title">Диагональ экрана</span>
                        <span class="dropdown__icon icon"></span>
                      </div>
                    </div>
                  </div>
                  <div class="os">
                    <div class="os__dropdown dropdown">
                      <div class="dropdown__header">
                        <span class="dropdown__title">Операционная система</span>
                        <span class="dropdown__icon icon"></span>
                      </div>
                    </div>
                  </div>
                  <div class="ssd">
                    <div class="ssd__dropdown dropdown">
                      <div class="dropdown__header">
                        <span class="dropdown__title">Объем SSD</span>
                        <span class="dropdown__icon icon"></span>
                      </div>
                    </div>
                  </div>
                  <div class="reset">
                    <button class="button reset__btn" id="clear-filter">Сброс фильтров</button>
                    <button class="button reset__btn" id="clear-storage">Сброс настроек</button>
                  </div>
                </div>
              </div>
              <ul class="product__list"></ul>
            </div>
          </section>
        `;
        document.body.append(createMain);
    }

    renderFooter() {
        const createFooter = document.createElement('footer');
        createFooter.classList.add('footer');
        createFooter.innerHTML = `
          <div class="footer__wrap">
            <a target="_blank" href="https://rs.school/js/" class="link rs-link"></a>
            <div class="author">
              <a target="_blank" href="https://github.com/Boffin-ux" class="link github-link"></a> <span>2022</span>
            </div>
          </div>
        `;
        document.body.appendChild(createFooter);
    }

    add() {
        this.renderHeader();
        this.renderMain();
        this.renderFooter();
    }
}
