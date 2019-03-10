export class ChartBuilder {
    /**
     * _initialized will be `true` when Tchart was inited
     * @type {boolean} _initialized
     * @type {string} canvas
     * @type {boolean} interactiveLineVisible
     */

     constructor(canvas, paths, minCount, maxCount) {
         this.constructor.canvas = canvas;
         this.constructor.minCount = minCount;
         this.constructor.maxCount = maxCount;
         this.constructor.paths = paths;

         this.constructor._build();
     }

     static _build = () => {
        this._buildOrdinates();
        // this.buildTimeline();
        // this.buildPath();
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

        this.dotes = dotes.reverse();
    }

    static _buildDotes = () => {
        console.log('-----ChartBuilder------------', this.dotes);

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
};