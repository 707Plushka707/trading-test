const EventEmmiter = require('events');
const Funds = require('../funds');
const { exportData, removeFile } = require('../utils/file');

class TradeStrategy extends EventEmmiter {

    #klines = new Array();
    funds = null;

    constructor() {
        super();
        if (this.constructor === TradeStrategy) {
            throw new TypeError('Abstract class "TradeStrategy" cannot be instantiated directly');
        }
        const outputFileName = `output/result-${this.constructor.name}.csv`;
        removeFile(outputFileName);
        this.funds = new Funds(outputFileName);

        // -- Events Start
      
        this.on("openLong", this.funds.openLong)
    
        this.on("closeLong" , this.funds.closeLong);
    
        this.on("openShort" , this.funds.openShort)
    
        this.on("closeShort" , this.funds.closeShort);
  
        // -- Events End
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