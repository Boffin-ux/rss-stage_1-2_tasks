import { DataSources } from '../../types/options';
import './sources.css';

class Sources {
    draw(data: Readonly<DataSources[]>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = <HTMLTemplateElement>sourceItemTemp.content.cloneNode(true);

                (<HTMLElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
                (<HTMLElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            });
        }
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
