export type UrlApi = { url: string };

export interface ApiData {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    manufacturer: string;
    popular: boolean;
    color: string;
    specification: {
        screen: string[];
        CPU: string;
        GPU: string;
        RAM: string;
        SSD: string;
        OS: string;
    };
}
export interface Storage {
    [key: string]: (string | boolean)[] | undefined;
    popular?: boolean[];
    search?: string[];
    brand?: string[];
    color?: string[];
    os?: string[];
    screen?: string[];
    ssd?: string[];
}
export type Values = {
    valueMin: number;
    valueMax: number;
};
