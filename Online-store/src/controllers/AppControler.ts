import AppModel from '../models/AppModel';
import AppView from '../views/AppView';
import { UrlApi, Values } from '../types/options';
import LocalStorage from './LocalStorage';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

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

    countOrders() {
        const getCount = <HTMLElement>document.querySelector('.cart__counter');
        if (this.storage.getOrders() && this.storage.getOrders().length > 0) {
            getCount.classList.add('counter--active');
            getCount.textContent = this.storage.getOrders().length.toString();
        } else if (!this.storage.getOrders() || this.storage.getOrders().length < 1) {
            getCount.classList.remove('counter--active');
            getCount.textContent = '0';
        }
    }

    eventRange(arrValue: Values) {
        const getRangePrice = this.storage.getRanges();
        const { valueMin, valueMax } = arrValue;

        let maxPrice = 0;
        let minPrice = 0;

        if (getRangePrice.length > 0) {
            minPrice = Number(getRangePrice[0]);
            maxPrice = Number(getRangePrice[1]);
        } else {
            maxPrice = valueMax;
            minPrice = valueMin;
        }

        const sliderPrice = document.getElementById('slider-price') as noUiSlider.target;

        const slider = noUiSlider.create(sliderPrice, {
            start: [`${minPrice}`, `${maxPrice}`],
            connect: true,
            format: {
                to: function (value) {
                    return value.toFixed(0);
                },
                from: function (value) {
                    return Number(value);
                },
            },
            range: {
                min: Number(`${valueMin}`),
                max: Number(`${valueMax}`),
            },
        });

        const inputMin = <HTMLInputElement>document.getElementById('value-min');
        const inputMax = <HTMLInputElement>document.getElementById('value-max');

        slider.on('update', (values, handle: number) => {
            if (handle) {
                inputMax.value = values[handle].toString();
            } else {
                inputMin.value = values[handle].toString();
            }
        });

        inputMin.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '');
            slider.set([this.value]);
        });
        inputMax.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '');
            slider.set(['', this.value]);
        });

        slider.on('end', () => {
            this.storage.setRanges(slider.get() as string[]);
            void this.updateView();
        });
    }

    eventSearch() {
        const searchInput = <HTMLInputElement>document.querySelector('.search-form__input');
        const clearFormBtn = <HTMLElement>document.querySelector('.search-form__clear');
        const objKey = 'search';

        const getFilter = this.storage.getFilter();
        const valueStorage = getFilter.search?.toString();

        if (valueStorage) {
            searchInput.value = valueStorage;
            clearFormBtn.classList.add('clear--active');
        } else {
            searchInput.value = '';
            clearFormBtn.classList.remove('clear--active');
        }

        searchInput.focus();
        searchInput.addEventListener('input', () => {
            this.storage.setFilter(objKey, searchInput.value);
            if (searchInput.value.length === 0) {
                clearFormBtn.classList.remove('clear--active');
            } else {
                clearFormBtn.classList.add('clear--active');
            }
            void this.updateView();
        });
        clearFormBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.storage.setFilter(objKey, searchInput.value);
            clearFormBtn.classList.remove('clear--active');
            void this.updateView();
        });
    }

    eventPopular() {
        const checkbox = <HTMLInputElement>document.querySelector('.popular__checkbox');

        const activeBox = this.storage.getFilter();
        const objKey = 'popular';
        const objGetValue = activeBox[objKey];
        if (objGetValue && objGetValue[0]) checkbox.checked = true;

        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                this.storage.delElFilter(objKey, false);
                this.storage.setFilter(objKey, true);
            } else {
                this.storage.delElFilter(objKey, true);
                this.storage.setFilter(objKey, false);
            }
            void this.updateView();
        });
    }

    eventSort() {
        const list = <HTMLElement>document.querySelector('.sort__dropdown > .dropdown__list');
        const dropdownItem = document.querySelectorAll('.dropdown__item');
        const activeSort = this.storage.getSort();

        if (activeSort && activeSort.length > 0) {
            list.classList.remove('list--hidden');
            [...dropdownItem].forEach((item) => {
                if (item instanceof HTMLElement && item.dataset.sort === activeSort) {
                    item.classList.add('item--active');
                }
            });
        }

        list.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;

            if (target.closest('.dropdown__item')) {
                [...dropdownItem].forEach((item) => {
                    item.classList.remove('item--active');
                });
                target.classList.add('item--active');
                if (target.dataset.sort === 'a-z') {
                    this.storage.setSort('a-z');
                } else if (target.dataset.sort === 'z-a') {
                    this.storage.setSort('z-a');
                } else if (target.dataset.sort === 'price-inc') {
                    this.storage.setSort('price-inc');
                } else if (target.dataset.sort === 'price-dic') {
                    this.storage.setSort('price-dic');
                }
                void this.updateView();
            }
        });
    }

    eventCheckBox(keys: string[]) {
        const setListener = (selector: string) => {
            const list = <HTMLElement>document.querySelector(`.${selector}__dropdown > .dropdown__list`);
            const itemsInput = list.querySelectorAll('.dropdown__label input');
            const items = list.querySelectorAll('.dropdown__label');
            const activeDropdown = this.storage.getFilter();
            const objKey = selector;
            const objGetValue = activeDropdown[objKey as keyof typeof activeDropdown] as string[];

            if (objGetValue && objGetValue.length > 0) {
                list.classList.remove('list--hidden');
                items.forEach((item) => {
                    const title = item.querySelector('.dropdown__item-title')?.textContent?.toString();
                    const checkbox = <HTMLInputElement>item.querySelector('.dropdown__checkbox');
                    if (title && objGetValue.includes(title.toString())) {
                        checkbox.checked = true;
                    }
                });
            }

            itemsInput.forEach((input) => input.addEventListener('click', (e) => e.stopPropagation()));

            items.forEach((item) => {
                item.addEventListener('click', () => {
                    const title = item.querySelector('.dropdown__item-title')?.textContent?.toString();
                    const checkbox = <HTMLInputElement>item.querySelector('.dropdown__checkbox');
                    if (title && checkbox.checked === false) {
                        this.storage.setFilter(objKey, title);
                    } else if (title && checkbox.checked === true) {
                        this.storage.delElFilter(objKey, title);
                    }
                    void this.updateView();
                });
            });
        };

        keys.map((key) => setListener(key));
    }

    resetSetings(arrValue: Values) {
        const clearFilterBtn = document.getElementById('clear-filter');
        const clearStorageBtn = document.getElementById('clear-storage');

        clearFilterBtn?.addEventListener('click', () => {
            const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=checkbox]:checked');
            const list: NodeListOf<HTMLElement> = document.querySelectorAll('.dropdown__list');
            const sliderPrice = (<HTMLElement>document.getElementById('slider-price')) as noUiSlider.target;
            sliderPrice.noUiSlider?.set([arrValue.valueMin, arrValue.valueMax]);

            list.forEach((item) => {
                const parent = <HTMLElement>item.parentNode;
                const getItem = parent.querySelector('.item--active');
                if (parent.className.indexOf('brand') && !getItem) item.classList.add('list--hidden');
            });
            [...checkboxes].map((checkbox) => {
                if (checkbox && checkbox.checked) checkbox.checked = false;
            });
            this.storage.resetFilter();
            this.storage = new LocalStorage();
            void this.updateView();
            this.eventSearch();
        });

        clearStorageBtn?.addEventListener('click', () => {
            this.storage.resetAll();
            this.storage = new LocalStorage();
            document.body.innerHTML = '';
            void this.start();
        });
    }

    async start() {
        const model = new AppModel(this.state, this.storage);
        const data = await model.getData();
        const dataFilters = await model.getData(false);
        const getRangeSum = model.getValueSum(dataFilters);

        const view = new AppView(data);
        view.create();
        view.renderCard();
        view.renderRange(getRangeSum);
        view.renderFilter(model.getSpec(dataFilters));

        this.dropdownToggle();
        this.countOrders();
        this.eventSort();
        this.eventSearch();
        this.eventPopular();
        this.eventRange(getRangeSum);
        this.eventCheckBox(Object.keys(model.getSpec(data)));
        this.resetSetings(getRangeSum);
    }

    async updateView() {
        const model = new AppModel(this.state, this.storage);
        const data = await model.getData();
        const view = new AppView(data);
        view.renderCard();
    }
}
