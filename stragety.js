const EventEmmiter = require('events');
const { MACD, EMA, RSI } = require("talib-binding");
const config = require('./config');
const { getPrettyDatetime } = require('./utils/date');

class TradeStrategy extends EventEmmiter {

    #klines = new Array();

    init(klines) {
        this.klines = klines;
    }

    addKline(kline) {
        this.klines.push(kline);
        this.klines.shift();
        const decision = this.evaluate();
    }

    evaluate() {
        const close = new Array();
        this.klines.forEach(kline => {
            close.push(kline.close);
        });

        const macd = MACD(close);
        const ema200 = EMA(close, 200)
        const rsi = RSI(close);

        lastMACD = macd[macd.length - 1];
        beforeLastMACD = macd[macd.length - 2];
        
        const logInfo = {
            datetime: getPrettyDatetime(),
            close: close[close.length],
            macd: macd[macd.length - 1],
            rsi: rsi[resizeBy.length -1],
            ema: ema[ema.length -1]
        }

        // if last macd > signal
        if(lastMACD[0] > lastMACD[1]) {

            // if before last macd < signal
            if(beforeLastMACD[0] < beforeLastMACD[1]) {
                // close short
                console.log("close short", logInfo);

                // open long
                console.log("open long", logInfo);
            }
        }

        // if last macd < signal
        if(lastMACD[0] < lastMACD[1]) {

            // if before last macd > signal
            if(beforeLastMACD[0] > beforeLastMACD[1]) {
                // close long
                console.log("close long", logInfo);

                // open short
                console.log("open short", logInfo);
            }
        }

        // force close long
        if(rsi[rsi.length - 1] > 75) {
            console.log("force close long", logInfo);

        }

        // force close short
        if(rsi[rsi.length - 1] < 25) {
            console.log("force close short", logInfo);
        }
    }

}



module.exports = TradeStrategy;