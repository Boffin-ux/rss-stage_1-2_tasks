import { Storage } from '../types/options';

export default class LocalStorage {
    private _orders: string[];

    private _range: string[];

    private _filter: Storage;

    private _sort: string;

    constructor() {
        this._orders = localStorage.getItem('laptop-store_orders')
            ? (JSON.parse(localStorage.getItem('laptop-store_orders') || '') as string[])
            : [];
        this._range = localStorage.getItem('laptop-store_range')
            ? (JSON.parse(localStorage.getItem('laptop-store_range') || '') as string[])
            : [];
        this._filter = localStorage.getItem('laptop-store_filter')
            ? (JSON.parse(localStorage.getItem('laptop-store_filter') || '') as Storage)
            : {};
        this._sort = localStorage.getItem('laptop-store_sort')
            ? (JSON.parse(localStorage.getItem('laptop-store_sort') || '') as string)
            : '';
    }

    getOrders() {
        return this._orders;
    }

    setOrders(value: string[]) {
        this._orders = value;
        localStorage.setItem('laptop-store_orders', JSON.stringify(this._orders));
    }

    addOrder(value: string) {
        this._orders.push(value);
        localStorage.setItem('laptop-store_orders', JSON.stringify(this._orders));
    }

    getRanges() {
        return this._range;
    }

    setRanges(value: string[]) {
        this._range = value;
        localStorage.setItem('laptop-store_range', JSON.stringify(this._range));
    }

    getFilter() {
        return this._filter;
    }

    setFilter(key: string, value: string | boolean) {
        const objKey = key;
        if (!this._filter[objKey as keyof Storage]) this._filter[objKey as keyof Storage] = [];
        const objValue = this._filter[objKey as keyof typeof this._filter] as [string | boolean];
        if (objKey === 'search') {
            this._filter[objKey] = [value.toString()];
        } else {
            objValue.push(value);
        }
        localStorage.setItem('laptop-store_filter', JSON.stringify(this._filter));
    }

    delElFilter(key: string, value: string | boolean) {
        const objKey = key;
        const objValue = this._filter[objKey as keyof Storage] as (string | boolean)[];
        if (this._filter[objKey as keyof Storage] && objValue) {
            this._filter[objKey as keyof Storage] = objValue.filter((el) => el !== value);
        }
        localStorage.setItem('laptop-store_filter', JSON.stringify(this._filter));
    }

    getSort() {
        return this._sort;
    }

    setSort(value: string) {
        this._sort = value;
        localStorage.setItem('laptop-store_sort', JSON.stringify(this._sort));
    }

    resetFilter() {
        localStorage.removeItem('laptop-store_filter');
        localStorage.removeItem('laptop-store_range');
    }

    resetAll() {
        localStorage.removeItem('laptop-store_filter');
        localStorage.removeItem('laptop-store_orders');
        localStorage.removeItem('laptop-store_sort');
        localStorage.removeItem('laptop-store_range');
    }
}
