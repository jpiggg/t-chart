import { createGzip } from "zlib";

/**
 * Common class for create chart
 * @class
 * @constructor
 * @public
 */
export class TChart {
    /**
     * _initialized will be `true` when Tchart was inited
     * @type {boolean} _initialized
     * @type {string} canvas
     * @type {boolean} interactiveLineVisible
     */
    static _initialized = false;
    static canvas = null;
    static interactiveLineVisible = true;

    constructor(canvas, options = {}, minCount, maxCount) {
        this.options = options;
        this.minCount = minCount;
        this.maxCount = maxCount;
        this.theme = 'light';

        this.constructor.minCount = minCount;
        this.constructor.maxCount = maxCount;
        this.constructor.canvas = canvas;
        this.constructor._init();
    };


    static _init = () => {
        if (!this.canvas) {
            throw new Error('Element canvas must be required');
        }

        this._initialized = true;
        this._drawChart();
    }

    static _drawChart = () => {
        const { width, height } = this.canvas;
        const COUNT_DOTES = 5;
        const INCREMENT_DOTES = this.maxCount / COUNT_DOTES - this.minCount;

        const dotes = new Array(COUNT_DOTES).fill().reduce(prevDote => {
            const nextDote = prevDote[prevDote.length - 1] + INCREMENT_DOTES;
            return prevDote.concat(nextDote);
        }, [0]);

        const ratio = height / dotes[dotes.length - 1];
        const ordinates = dotes.map(dote => dote * ratio + .5);
        const ctx = this.canvas.getContext('2d');
        ctx.lineWidth = 1;
        ctx.beginPath();
        ordinates.map(yPath => {
            ctx.moveTo(0, yPath);
            ctx.lineTo(width, yPath);
            ctx.stroke();
            ctx.closePath();

            return null;
        });

        // Drawing last path
        const lastOrdinate = ordinates[ordinates.length - 1] -1;
        ctx.moveTo(0, lastOrdinate);
        ctx.lineTo(width, lastOrdinate);
        ctx.stroke();
        ctx.closePath();
        console.log('----------dotes, ordinates----------', dotes, ordinates);

        this._drawOrdinateDotes(dotes.reverse());
    }

    static _drawOrdinateDotes = dotes => {
        const parentElem = this.canvas.parentElement;
        const dotesContainer = document.createElement('div');
        dotesContainer.className = 'tchrt_y-root';
        dotes.map(dote => {
            const elem = document.createElement('span');
            elem.className = 'tchrt_y';
            elem.innerText = dote;

            return dotesContainer.appendChild(elem);
        });

        parentElem.appendChild(dotesContainer);
    }

    initialized = () => TChart._initialized;
    refresh = () => this._drawChart();

    onHover = callback => {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be function!');
        }
    }
};