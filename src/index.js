import { TChart } from './lib';
import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('canvas');
    window.tchart = new TChart(root, {
        data: [
            {
                name: 'Joined'
            },
            {
                name: 'Left'
            }
        ],
    }, 0, 250);

    // window.tchart.theme = 'test';
    // window.tchart.refresh();

    // const tchart = new TChart(root);
});