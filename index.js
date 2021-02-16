const MacdEma200Strategy = require('./strategy/macdema200strategy');
const BinanceWrapper = require('./binance');


const start = async() => {
  
  const strategy = new MacdEma200Strategy();
  const binance = new BinanceWrapper({
    symbol: "BTCUSDT",
    inteval: "5m"
  });

  const klines = await binance.getHistoricalKlines(
    {
      limit: 10
    }
  );
  strategy.init(klines);
  console.log(klines);

  // binance.on("newKline", (kline) => {
  //   strategy.addKline(kline);
  // })

}

start();