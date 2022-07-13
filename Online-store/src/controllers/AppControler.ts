import AppModel from '../models/AppModel';
import AppView from '../views/AppView';
import { UrlApi } from '../types/options';

export default class AppControler {
    state: UrlApi;

    constructor() {
        this.state = {
            url: 'https://62c42cf07d83a75e39f27e15.mockapi.io/cards',
        };
    }

    async start() {
        const model = new AppModel(this.state);
        const data = await model.getData();
    }
}
