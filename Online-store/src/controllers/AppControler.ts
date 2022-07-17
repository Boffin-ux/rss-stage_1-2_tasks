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
        getCount.textContent = this.storage.getOrders().length.toString();
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
        this.eventRange(getRangeSum);
    }

    async updateView() {
        const model = new AppModel(this.state, this.storage);
        const data = await model.getData();
        const view = new AppView(data);
        view.renderCard();
    }
}
