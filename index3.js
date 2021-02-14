const { BBANDS } = require("talib-binding");
const binance = require('binance');

const tradingConfig = {
    interval: '5m',
    symbol: 'BTCUSDT'
}

const binanceRest = new binance.BinanceRest({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
    timeout: 15000, 
    recvWindow: 60000,
    disableBeautification: false,
    handleDrift: false,
    baseUrl: 'https://api.binance.com/',
    requestOptions: {}
});


const start = async() => {
    const historicalData = await binanceRest.klines({
        symbol:tradingConfig.symbol,
        interval:tradingConfig.interval,
        limit:40
    })

    console.log(historicalData)

    const bbands = 
        BBANDS(historicalData.map((data) => data.close))

    const len = bbands[0].length;
    console.log(bbands[0][len -2]);
    console.log(bbands[1][len -2]);
    console.log(bbands[2][len -2]);

}

start();