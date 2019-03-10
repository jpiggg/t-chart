import { getTimestamp, getDateFromTimestamp } from '../helpers/time';
/**
 * Class for build chart
 * @class
 * @constructor
 * @private
 */
export class ChartBuilder {
     constructor(canvas, paths, minCount, maxCount) {
         this.constructor.canvas = canvas;
         this.constructor.minCount = minCount;
         this.constructor.maxCount = maxCount;
         this.constructor.paths = paths;

         this.constructor._build();
     }

     static _build = () => {
        this._buildOrdinates();
        this._buildTimeline();
        // this._buildPath();
     }

    static _buildLines = () => {
        const { width, height } = this.canvas;
        const COUNT_DOTES = 5;
        const INCREMENT_DOTES = this.maxCount / COUNT_DOTES - this.minCount;

        const dotes = new Array(COUNT_DOTES).fill().reduce(prevDote => {
            const nextDote = prevDote[prevDote.length - 1] + INCREMENT_DOTES;
            return prevDote.concat(nextDote);
        }, [0]);

        const ratio = height / dotes[dotes.length - 1];
        const ordinates = dotes.map(dote => dote * ratio + .5);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        ordinates.map(yPath => {
            this.ctx.moveTo(0, yPath);
            this.ctx.lineTo(width, yPath);
            this.ctx.stroke();
            this.ctx.closePath();

            return null;
        });

        // Drawing last path
        const lastOrdinate = ordinates[ordinates.length - 1] -1;
        this.ctx.moveTo(0, lastOrdinate);
        this.ctx.lineTo(width, lastOrdinate);
        this.ctx.stroke();
        this.ctx.closePath();

        this.dotes = dotes.reverse();
    }

    static _buildDotes = () => {
        const parentElem = this.canvas.parentElement;
        const dotesContainer = document.createElement('div');
        dotesContainer.className = 'tchrt_y-root';
        this.dotes.map(dote => {
            const elem = document.createElement('span');
            elem.className = 'tchrt_y';
            elem.innerText = dote;

            return dotesContainer.appendChild(elem);
        });

        parentElem.appendChild(dotesContainer);
    }

    static _buildOrdinates = () => {
        this._buildLines();
        this._buildDotes();
    }

    static _buildTimeline = () => {
        const getMaxNumber = (a, b) => a > b ? a : b;
        const getMinNumber = (a, b) => a > b ? b : a;
        const minDate = '';
        const maxDate = '';
        const distance = '';

        const minNumbers = this.paths.map(obj => {
            //число 
            let mins = [];
            let maxs = [];

            const test = Object.keys(obj).reduce((prevDate, date, index) => {
                // console.log('----prevDate date ----', prevDate, date);
                const min = getMinNumber(prevDate, getTimestamp(date));
                const max = getMaxNumber(prevDate, getTimestamp(date));

                return {min: min, max: max};
        }, getTimestamp('20.02'))

        console.log('------obj---', test);
        // число, число -> [число, число]
        });

        // const minNumber = getDateFromTimestamp(getMinNumber(...minNumbers));

        // console.log('------minNumber------------', minNumbers, minNumber);
    }
};