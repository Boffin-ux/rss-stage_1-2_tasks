import { ApiData, UrlApi } from '../types/options';

export default class AppModel {
    constructor(private state: UrlApi) {}

    async getData() {
        const { url } = this.state;
        const resp = await fetch(url);
        return <ApiData[]>await resp.json();
    }
}
