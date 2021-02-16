const EventEmmiter = require('events');
const config = require('../test/config');

class TradeStrategy extends EventEmmiter {

    #klines = new Array();

    constructor() {
        super();
        if (this.constructor === TradeStrategy) {
            throw new TypeError('Abstract class "TradeStrategy" cannot be instantiated directly');
        }
    }

    init(klines) {
        this.klines = klines;
    }

    addKline(kline) {
        this.klines.push(kline);
        this.klines.shift();
        const decision = this.evaluate();
    }
}



module.exports = TradeStrategy;