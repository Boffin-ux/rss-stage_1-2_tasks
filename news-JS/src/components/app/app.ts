import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;

    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    filter() {
        const sourceNav = <HTMLElement>document.querySelector('.source-nav');

        sourceNav?.addEventListener('click', (e) => {
            const navItem = sourceNav.querySelectorAll('.source-nav__item');
            const target = <HTMLElement>e.target;
            [...navItem]?.map((item) => {
                if (item.closest('.item--active')) {
                    item.classList.remove('item--active');
                }
            });
            target.classList.add('item--active');
            this.controller.getSources((data) => {
                let letters: string[];
                switch (target.innerHTML) {
                    case 'A-D':
                        letters = ['a', 'b', 'c', 'd'];
                        break;
                    case 'E-H':
                        letters = ['e', 'f', 'g', 'h'];
                        break;
                    case 'I-L':
                        letters = ['i', 'j', 'k', 'l'];
                        break;
                    case 'M-P':
                        letters = ['m', 'n', 'o', 'p'];
                        break;
                    case 'Q-T':
                        letters = ['q', 'r', 's', 't'];
                        break;
                    case 'U-X':
                        letters = ['u', 'v', 'w', 'x'];
                        break;
                    case 'Y-Z':
                        letters = ['y', 'z'];
                        break;
                    default:
                        letters = ['All'];
                        break;
                }

                if (letters[0] !== 'All') {
                    this.view.drawSources(data, letters);
                } else {
                    this.view.drawSources(data);
                }
            });
        });
    }

    start() {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
        this.filter();
    }
}

export default App;
