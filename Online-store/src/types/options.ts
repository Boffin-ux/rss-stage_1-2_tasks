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
        HDD: string;
        OS: string;
    };
}
