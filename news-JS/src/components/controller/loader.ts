import { ApiData, HttpStatusCode, Callback, Options } from './../types/options';

class Loader {
    constructor(public baseLink: string, public options: Partial<Options>) {}

    protected getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Partial<Options> | object },
        callback: Callback<ApiData> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === HttpStatusCode.UNAUTHORIZED || res.status === HttpStatusCode.NOT_FOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<Options> | object, endpoint: string) {
        const urlOptions: { [index: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback<ApiData>, options: Partial<Options> | object) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data: ApiData) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
