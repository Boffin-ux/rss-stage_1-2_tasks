import { ApiData } from '../types/options';

export default class AppView {
    constructor(private data: ApiData[]) {
        this.data = data;
    }

    create() {}
}
