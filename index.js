const BollingerEma200Strategy = require('./strategy/bollingerema200strategy');
const MacdEma = require('./strategy/macdstrategy');
const MacdEma200Strategy = require('./strategy/macdema200strategy');
const MacdEma200TrendStrategy = require('./strategy/macdema200trendstrategy');
const BinanceWrapper = require('./binance');
const { sleep } = require('./utils/sleep');
const { getPrettyDatetime } = require('./utils/date');

const TEST_MODE = 1;

const TEST_SYMBOL_LIST = "BTCUSDT";
// const TEST_PERIOD_LIST = "4h,1h";
const TEST_PERIOD_LIST = "4h,1h,15m,5m";
const TEST_START_DATE = "2019-01-01 00:00:00";

const startTestMode = async() => {
  
  const symbols = TEST_SYMBOL_LIST.split(",");
  const periods = TEST_PERIOD_LIST.split(",");

  for(let i = 0; i < symbols.length; i++) {
    for(let j = 0; j < periods.length; j++) {
      //await sleep(2000);
      const symbol = symbols[i];
      const period = periods[j];

      // const outputFileName = `output/result-${symbol}-${period}.csv`;
      // removeFile(outputFileName);

      const bollingerEma200Strategy = new BollingerEma200Strategy();
      const macdEma = new MacdEma();
      const macdEma200Strategy = new MacdEma200Strategy();
      const macdEma200TrendStrategy = new MacdEma200TrendStrategy();

      const strategies = new Array();

      // strategies.push(bollingerEma200Strategy);
      strategies.push(macdEma);
      // strategies.push(macdEma200TrendStrategy);

      const binance = new BinanceWrapper({
        symbol: symbol,
        interval: period
      });
    
      let klines = await binance.getHistoricalKlines(
        {
          limit: 400,
          startTime: (new Date(TEST_START_DATE)).getTime()
        }
      );

      for(k=0; k< strategies.length; k++) {

        const strategy = strategies[k];

        strategy.init(klines);
      }
      
      let lastKline = klines[klines.length -1];
      let lastOpenTime = new Date(lastKline.opentime);
    
      while(lastKline) {
        klines = 
          await binance.getHistoricalKlines({
            limit: 1500,
            startTime: lastKline.closetime + 1, 
          });
          
        lastKline = klines[klines.length -1];
  
        for(k=0; k< strategies.length; k++) {
          const strategy = strategies[k];
          const funds = strategy.funds;
          for(let l = 0; l < klines.length; l++) {
            strategy.addKline(klines[l]);
          }
  
          if(lastKline) {
            lastOpenTime = new Date(lastKline.opentime);
            console.log(`${getPrettyDatetime(lastOpenTime)} ${strategy.constructor.name} ${symbol} ${period} ${funds.totalWin}`);
          }
        }
        await sleep(350);
      }

    }
  }
}

if(TEST_MODE == 1) {
  startTestMode();
}

  
// binance.listen();
// binance.on("newKline", (kline) => {
//   console.log(kline);
// })