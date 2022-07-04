export type Callback<DataType> = (data: DataType) => void;

export interface DataArticle {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: { name: string; id: string };
}

export type DataSources = Pick<DataArticle['source'], 'id' | 'name'>;

export interface ApiData {
    articles: Array<DataArticle>;
    sources: Array<DataSources>;
}
export enum HttpStatusCode {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}

export type Options = {
    apiKey: string;
    sources: string;
};
