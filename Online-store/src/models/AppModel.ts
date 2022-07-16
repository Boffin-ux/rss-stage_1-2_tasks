import { ApiData, UrlApi } from '../types/options';

export default class AppModel {
    constructor(private state: UrlApi) {}

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

    async getData() {
        const { url } = this.state;
        const resp = await fetch(url);
        const data = <ApiData[]>await resp.json();
        return data;
    }
}
