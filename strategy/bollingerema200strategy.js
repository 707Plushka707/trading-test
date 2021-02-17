const TradeStrategy = require("./tradestrategy");
const { MACD, EMA, RSI, BBANDS } = require("talib-binding");


class BollingerEma200Strategy extends TradeStrategy {

    evaluate() {
        // get last kline
        const lastKline = this.klines[this.klines.length - 1];
        const beforeLastKline = this.klines[this.klines.length - 2];

        // get close values
        const close = new Array();
        for(let i = 0; i < this.klines.length; i++) {
            close.push(this.klines[i].close);
        }

        // get indicators
        const ema200 = EMA(close, 200)
        const bbands = BBANDS(close);

        const lastbbands = bbands[bbands.length - 1];
        const lastEma2000 = ema200[ema200.length - 1];
        const last100Ema2000 = ema200[ema200.length - 51];

        
        if(lastKline.close > lastbbands[0] ||
            lastKline.close < lastbbands[2]) {
            this.emit("closeLong", lastKline);
            this.emit("closeShort", lastKline);
        }
        
        if(lastKline.close > lastEma2000 && lastKline.open > lastEma2000) {
            if(beforeLastKline.close < lastbbands[1] && lastKline.close > lastbbands[1]) {
                this.emit("openLong", lastKline);
            }
        }
        
        if(lastKline.close < lastEma2000 && lastKline.open < lastEma2000) {
            if(beforeLastKline.close > lastbbands[1] && lastKline.close < lastbbands[1]) {
                this.emit("openShort", lastKline);
            }
        }
    }
}

module.exports = BollingerEma200Strategy;