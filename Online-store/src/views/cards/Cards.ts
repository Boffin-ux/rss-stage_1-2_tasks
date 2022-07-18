import { ApiData } from '../../types/options';
import LocalStorage from '../../controllers/LocalStorage';
import './cards.scss';
import '../../assets/img/default.jpg';

export default class Cards {
    storage: LocalStorage;

    constructor() {
        this.storage = new LocalStorage();
    }

    render(data: Readonly<ApiData[]>) {
        const wrapCards = <HTMLElement>document.querySelector('.product__list');
        wrapCards.textContent = '';

        const getFilter = this.storage.getFilter();
        const valueStorage = getFilter.search?.toString() || '';
        const searchItems = data.filter((item) => item.title.toLowerCase().includes(valueStorage.toLowerCase()));

        if (searchItems.length < 1 || data.length < 1) {
            const result = document.createElement('div');
            result.classList.add('no-results');
            result.innerHTML = `<h2>Cовпадений не найдено</h2>`;
            wrapCards.append(result);
        }

        data.forEach((item) => {
            const { id, title, imageUrl, price, specification, color } = item;
            const descript = Object.values(specification).flat();
            const createCard = document.createElement('li');
            createCard.className = 'product__card card';
            createCard.innerHTML = `
                <div class="card__wrap">
                    <h3 class="card__title">${title}</h3>
                    <div class="card__img"></div>
                    <div class="card__type">${descript.join('/ ')}, <span>${color}</span></div>
                    <div class="card__price">Цена: ${price.toLocaleString()} <span>₽</span></div>
                    <button class="button card__btn">В корзину</button>
                </div>
            `;
            document.querySelector('.product__list')?.appendChild(createCard);
            const cardImg = <HTMLElement>createCard.querySelector('.card__img');
            cardImg.style.backgroundImage = `url(${imageUrl || '../../assets/img/default.jpg'})`;

            const cardBtn = <HTMLElement>createCard.querySelector('.card__btn');
            this.storage.getOrders().map((card: string) => {
                if (card === id.toString()) {
                    createCard.classList.add('card--add');
                    cardBtn.textContent = 'В корзине';
                }
            });

            createCard.addEventListener('click', () => {
                const getCount = <HTMLElement>document.querySelector('.cart__counter');

                if (!createCard.closest('.card--add')) {
                    createCard.classList.add('card--add');
                    cardBtn.textContent = 'В корзине';
                    this.storage.addOrder(id.toString());
                } else {
                    createCard.classList.remove('card--add');
                    cardBtn.textContent = 'В корзину';
                    this.storage.setOrders(this.storage.getOrders().filter((card: string) => card !== id.toString()));
                }

                if (this.storage.getOrders() && this.storage.getOrders().length > 0) {
                    getCount.classList.add('counter--active');
                    getCount.textContent = this.storage.getOrders().length.toString();
                } else if (!this.storage.getOrders() || this.storage.getOrders().length < 1) {
                    getCount.classList.remove('counter--active');
                    getCount.textContent = '0';
                }
            });
        });
    }
}
