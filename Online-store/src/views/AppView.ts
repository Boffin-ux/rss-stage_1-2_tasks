import { ApiData, Storage } from '../types/options';
import RootMarkup from './root/RootMarkup';
import Cards from './cards/Cards';

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
        const render = (arr: string[], selector: string, hidden = true) => {
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
                                <span class="dropdown__item-title">${str}</span>
                            </label>
                        </li>`;
                })
                .join('');
            dropdown?.append(list);
        };

        entries.map((item: [string, string[]]) => {
            render(item[1], item[0]);
        });
    }
}
