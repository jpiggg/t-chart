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

var data = [
    {
        name: 'Joined',
        dataCount: {
            '20.02': 30,
            '21.02': 15,
            '22.02': 48,
            '23.02': 89,
            '24.02': 62,
            '25.02': 73,
            '26.02': 12,
            '27.02': 5,
            '28.02': 24,
            '01.03': 37
        }
    },
    {
        name: 'Left',
        dataCount: {
            '19.02': 30,
            '20.02': 15,
            '21.02': 48,
            '22.02': 89,
            '23.02': 62,
            '24.02': 73,
            '25.02': 12,
            '26.02': 5,
            '27.02': 24,
            '28.02': 37
        }
    }
];