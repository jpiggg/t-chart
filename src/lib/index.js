import { ChartBuilder } from './vendors/chart-builder';
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
        this.theme = 'light';

        this.constructor.options = options;
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
        const {canvas, options, minCount, maxCount} = this;
        const {data = []} = options;

        const paths = data.map(path => path.dataCount);
        new ChartBuilder(canvas, paths, minCount, maxCount);
        // new PathBuilder();
        // new TipsBuilder();
        // new MapBuilder();
        // new ControllsBuilder();
    }

    initialized = () => TChart._initialized;
    refresh = () => this._drawChart();

    onHover = callback => {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be function!');
        }
    }
};