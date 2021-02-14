const TradeStrategy = require('./stragety');
const BinanceWrapper = require('./binance');

const strategy = new TradeStrategy();
const binance = new BinanceWrapper();

const start = async() => {
  
  const klines = await binance.getHistoricalKlines();
  strategy.init(klines);

  binance.on("newKline", (kline) => {
    strategy.addKline(kline);
  })

}

start();