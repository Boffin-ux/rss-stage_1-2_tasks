import { ApiData } from './../types/options';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news: News;

    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ApiData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ApiData, letters?: string[]) {
        const values = data?.sources ? data?.sources : [];
        if (letters) {
            const getFilterData = (arr: string[]) => {
                return [...values].filter((item) => arr.includes(item.id.slice(0, 1).toLowerCase()));
            };
            const getSources = document.querySelector('.sources');
            if (getSources) getSources.innerHTML = '';
            this.sources.draw(getFilterData(letters));
        } else {
            this.sources.draw(values);
        }
    }
}

export default AppView;
