import AppModel from '../models/AppModel';
import AppView from '../views/AppView';
import { UrlApi } from '../types/options';
import LocalStorage from './LocalStorage';

export default class AppControler {
    state: UrlApi;

    storage: LocalStorage;

    constructor() {
        this.state = {
            url: 'https://62c42cf07d83a75e39f27e15.mockapi.io/cards',
        };
        this.storage = new LocalStorage();
    }

    dropdownToggle() {
        const dropdowns = document.querySelectorAll('.dropdown');
        [...dropdowns].forEach((dropdown) => {
            dropdown.addEventListener('click', (e) => {
                const target = <HTMLElement>e.target;
                const list = <HTMLElement>dropdown.querySelector('.dropdown__list');

                if (list.closest('.list--hidden')) {
                    list.classList.remove('list--hidden');
                } else if (!target.closest('.dropdown__list')) {
                    list.classList.add('list--hidden');
                }
            });
        });
    }

    async start() {
        const model = new AppModel(this.state);
        const data = await model.getData();
        const dataFilters = await model.getData();

        const view = new AppView(data);
        view.create();
        view.renderCard();
        view.renderFilter(model.getSpec(dataFilters));

        this.dropdownToggle();
    }

    async updateView() {
        const model = new AppModel(this.state);
        const data = await model.getData();
        const view = new AppView(data);
    }
}
