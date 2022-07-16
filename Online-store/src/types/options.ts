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
    // [x: string]: string[] | number[] | boolean[] | undefined | string | boolean;
    popular?: boolean[];
    search?: string[] | number[];
    brand?: string[];
    color?: string[];
    os?: string[];
    screen?: string[];
    ssd?: string[];
}

export type DataType = Pick<ApiData['specification'], 'screen' | 'CPU' | 'GPU' | 'RAM' | 'SSD' | 'OS'>;
