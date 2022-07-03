export interface DataArticle {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: { name: string; id: string };
}

export type DataSources = {
    id: string;
    name: string;
};

export interface ApiData {
    articles: Array<DataArticle>;
    sources: Array<DataSources>;
}
