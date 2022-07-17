import { ApiData, Storage, Values } from '../types/options';
import Cards from './cards/Cards';
import RootMarkup from './root/RootMarkup';
import './range.scss';

export default class AppView {
    constructor(private data: ApiData[]) {
        this.data = data;
    }

    create() {
        const root = new RootMarkup();
        root.add();
    }

    renderCard() {
        const cards = new Cards();
        cards.render(this.data);
    }

    renderFilter(filterGroup: Storage) {
        const entries = Object.entries(filterGroup);
        const render = (arr: (string | boolean)[], selector: string, hidden = true) => {
            const dropdown = document.querySelector(`.${selector}__dropdown`);
            const list = document.createElement('ul');
            list.className = 'dropdown__list';
            if (hidden && selector !== 'brand') list.classList.add('list--hidden');
            list.innerHTML = arr
                .map((str) => {
                    return `<li class="dropdown__item">
                            <label class="dropdown__label">
                                <input type="checkbox" class="dropdown__checkbox">
                                <span class="dropdown__box"></span>
                                <span class="dropdown__item-title">${str as string}</span>
                            </label>
                        </li>`;
                })
                .join('');
            dropdown?.append(list);
        };

        entries.map((item) => {
            if (item[1] !== undefined) render(item[1], item[0]);
        });
    }

    renderRange(arrValue: Values) {
        const { valueMin, valueMax } = arrValue;
        const parent = <HTMLElement>document.querySelector('.slider');
        parent.innerHTML = `
            <div class="slider__title">Цена, ₽</div>
            <div class="slider__inputs">
                <input name="input-min" type="numeric" class="slider__min" value="${valueMin}" id="value-min">
                <span>–</span>
                <input name="input-max" type="numeric" class="slider__max" value="${valueMax}" id="value-max">
            </div>
            <div id="slider-price"></div>
        `;
    }
}
