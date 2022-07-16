import { ApiData } from '../../types/options';
import './cards.scss';
import '../../assets/img/default.jpg';

export default class Cards {
    render(data: Readonly<ApiData[]>) {
        const wrapCards = <HTMLElement>document.querySelector('.product__list');
        wrapCards.textContent = '';

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

            createCard.addEventListener('click', () => {
                if (!createCard.closest('.card--add')) {
                    createCard.classList.add('card--add');
                    cardBtn.textContent = 'В корзине';
                } else {
                    createCard.classList.remove('card--add');
                    cardBtn.textContent = 'В корзину';
                }
            });
        });
    }
}
