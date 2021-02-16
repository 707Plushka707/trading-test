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

    // evaluate() {
    //     const close = new Array();
    //     this.klines.forEach(kline => {
    //         close.push(kline.close);
    //     });

    //     const macd = MACD(close);
    //     const ema200 = EMA(close, 200)
    //     const rsi = RSI(close);

    //     const lastMACD = {
    //         macd: macd[0][macd[0].length - 1],
    //         signal: macd[1][macd[1].length - 1],
    //         histogram: macd[2][macd[2].length - 1],
    //     };

    //     const beforeLastMACD = {
    //         macd: macd[0][macd[0].length - 2],
    //         signal: macd[1][macd[1].length - 2],
    //         histogram: macd[2][macd[2].length - 2],
    //     };
        
    //     const lastKline = this.klines[this.klines.length - 1];

    //     const logInfo = {
    //         opentime: new Date(lastKline.opentime),
    //         opentimeTimestamp: lastKline.opentime,
    //         close: close[close.length - 1],
    //         macd: lastMACD,
    //         rsi: rsi[rsi.length -1],
    //         ema200: ema200[ema200.length -1]
    //     }

    //     const lastEma2000 = ema200[ema200.length -1];
    //     //decisionMACDSimple(lastMACD, beforeLastMACD, rsi);
    //     this.decisionMACDEma200Simple(lastMACD, beforeLastMACD, lastEma2000, lastKline)
    // }

    // decisionMACDSimple(lastMACD, beforeLastMACD, lastKline, rsi) {

    //     if(lastMACD.macd > lastMACD.signal) {

    //         // if before last macd < signal
    //         if(beforeLastMACD.macd < beforeLastMACD.signal) {
    //             // close short
    //             // console.log("close short", logInfo);
    //             this.emit("closeShort", lastKline);

    //             // open long
    //             // console.log("open long", logInfo);
    //             this.emit("openLong", lastKline);
    //         }
    //     }

    //     // if last macd < signal
    //     if(lastMACD.macd < lastMACD.signal) {

    //         // if before last macd > signal
    //         if(beforeLastMACD.macd > beforeLastMACD.signal) {
    //             // close long
    //             // console.log("close long", logInfo);
    //             this.emit("closeLong", lastKline);

    //             // open short
    //             // console.log("open short", logInfo);
    //             this.emit("openShort", lastKline);
    //         }
    //     }

    //     // force close long
    //     if(rsi[rsi.length - 1] > 75) {
    //         // console.log("force close long", logInfo);

    //     }

    //     // force close short
    //     if(rsi[rsi.length - 1] < 25) {
    //         // console.log("force close short", logInfo);
    //     }
    // }

}



module.exports = TradeStrategy;