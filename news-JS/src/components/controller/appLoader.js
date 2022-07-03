import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '50b1f3e611bb4ad1b0c5d6a3a0347d7f',
        });
    }
}

export default AppLoader;
