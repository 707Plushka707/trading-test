const Binance = require('node-binance-api');
const { BBANDS, RSI, MACD } = require("talib-binding");


const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET,
});

binance.futuresSubscribe( 'btcusdt@kline_1m', (e) => {
  if(e.k.x) {
    console.log(e)
  }
});

const start = async () => {
  const candles = 
    await binance.futuresCandles(
      tradingConfig.symbol,
      tradingConfig.interval,
      {
        limit:100
      });

  const close = [];
  candles.forEach((candle) => {
    close.push(candle[4])
  })

  console.log(close);

  const macd = MACD(close);
  console.log(macd);

  // const bbands = 
  //   BBANDS(close,20)
  // console.log(bbands);

  // const rsi = RSI(close)
  // console.log(rsi)
}

//start();