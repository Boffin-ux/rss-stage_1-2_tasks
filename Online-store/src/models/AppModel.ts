import LocalStorage from '../controllers/LocalStorage';
import { ApiData, UrlApi } from '../types/options';

export default class AppModel {
    constructor(private state: UrlApi, private storage: LocalStorage) {}

    getSpec(data: ApiData[]) {
        const brand = Array.from(data, ({ manufacturer }) => manufacturer).filter(
            (val, ind, arr) => arr.indexOf(val) === ind
        );

        const getColor = Array.from(data, ({ color }) => color).filter((val, ind, arr) => arr.indexOf(val) === ind);

        const getInch = Array.from(
            Array.from(data, ({ specification }) => specification),
            ({ screen }) => screen
        )
            .flat()
            .filter((inch, ind, arr) => {
                if (Number(inch[0]) === 1 && arr.indexOf(inch) === ind) return inch;
            });

        const getOs = Array.from(
            Array.from(data, ({ specification }) => specification),
            ({ OS }) => OS
        ).filter((val, ind, arr) => arr.indexOf(val) === ind);

        const getSsd = Array.from(
            Array.from(data, ({ specification }) => specification),
            ({ SSD }) => SSD
        ).filter((val, ind, arr) => arr.indexOf(val) === ind);

        return {
            brand: brand,
            color: getColor,
            screen: getInch,
            os: getOs,
            ssd: getSsd,
        };
    }

    getValueSum(data: ApiData[]) {
        const valueMin = Math.min(...data.map((el) => el.price));
        const valueMax = Math.max(...data.map((el) => el.price));
        return { valueMin, valueMax };
    }

    filterData(data: ApiData[]) {
        const activeFilter = this.storage.getFilter();
        const activeSort = this.storage.getSort();
        const rangePrice = this.storage.getRanges();

        let newData = [...data];
        if (activeFilter.popular && activeFilter.popular[0]) {
            newData = newData.filter((item) => item.popular);
        }
        if (activeFilter.search && activeFilter.search[0]) {
            const value = activeFilter.search[0].toString();
            newData = newData.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
        }
        if (activeFilter.brand && activeFilter.brand[0]) {
            const value = activeFilter.brand;
            newData = newData.filter((item) => value.includes(item.manufacturer));
        }
        if (activeFilter.color && activeFilter.color[0]) {
            const value = activeFilter.color;
            newData = newData.filter((item) => value.includes(item.color));
        }
        if (activeFilter.os && activeFilter.os[0]) {
            const value = activeFilter.os;
            newData = newData.filter((item) => value.includes(item.specification.OS));
        }
        if (activeFilter.ssd && activeFilter.ssd[0]) {
            const value = activeFilter.ssd;
            newData = newData.filter((item) => value.includes(item.specification.SSD));
        }
        if (activeFilter.screen && activeFilter.screen[0]) {
            const value = activeFilter.screen;
            newData = newData.filter((item) => value.includes(item.specification.screen[0]));
        }
        if (activeSort && activeSort.length > 0) {
            if (activeSort === 'a-z') {
                newData = newData.sort((a, b) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            } else if (activeSort === 'z-a') {
                newData = newData.sort((a, b) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return 1;
                    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            } else if (activeSort === 'price-inc') {
                newData = newData.sort((a, b) => a.price - b.price);
            } else if (activeSort === 'price-dic') {
                newData = newData.sort((a, b) => b.price - a.price);
            }
        }
        if (rangePrice && rangePrice.length > 0) {
            newData = newData
                .filter((item) => item.price >= Number(rangePrice[0]) && item.price <= Number(rangePrice[1]))
                .sort((a, b) => a.price - b.price);
        }
        return newData;
    }

    async getData(filter = true) {
        const { url } = this.state;
        const resp = await fetch(url);
        const data = <ApiData[]>await resp.json();
        if (filter) {
            return this.filterData(data);
        } else {
            return data;
        }
    }
}
