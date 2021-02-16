const MacdEma200Strategy = require('./strategy/macdema200strategy');
const BinanceWrapper = require('./binance');
const { sleep } = require('./utils/sleep');
const { exportData, removeFile } = require('./utils/file');
const { getPrettyDatetime } = require('./utils/date');

const TEST_MODE = 1;

const TEST_SYMBOL_LIST = "BTCUSDT,ETHUSDT,XRPUSDT,EGLDUSDT";
const TEST_PERIOD_LIST = "4h,1h,15m,5m,1m";
const TEST_START_DATE = "2020-01-01 00:00:00";

const startTestMode = async() => {
  
  const symbols = TEST_SYMBOL_LIST.split(",");
  const periods = TEST_PERIOD_LIST.split(",");

  for(let i = 0; i < symbols.length; i++) {
    for(let j = 0; j < periods.length; j++) {
      //await sleep(2000);
      const symbol = symbols[i];
      const period = periods[j];

      currentLong = null;
      currentShort = null;
      let totalWin = 0;

      const outputFileName = `output/result-${symbol}-${period}.csv`;
      removeFile(outputFileName);

      const strategy = new MacdEma200Strategy();
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
      strategy.init(klines);


      // -- Events Start
    
      strategy.on("openLong" , (kline) => {
        if(!currentLong) {
          currentLong = kline;
        }
      })
  
      strategy.on("closeLong" , (kline) => {
        if(currentLong) {
          totalWin += kline.close - currentLong.close;
  
          const data = 
            "close long" + "\t" +
            getPrettyDatetime(new Date(currentLong.closetime)) + "\t" +
            getPrettyDatetime(new Date(kline.closetime)) + "\t" +
            (currentLong.close + "").replace(".", ",") + "\t" +
            (kline.close + "").replace(".", ",") + "\t" +
            ((kline.close - currentLong.close) + "").replace(".", ",") + "\t" +
            (totalWin + "").replace(".", ",") + "\t"
  
          exportData(data, outputFileName);
  
          currentLong = null;
        }
      });
  
      strategy.on("openShort" , (kline) => {
        if(!currentShort) {
          currentShort = kline;
        }
      })
  
      strategy.on("closeShort" , (kline) => {
        if(currentShort) {
          totalWin += (kline.close - currentShort.close) * -1;
  
          const data = 
            "close short" + "\t" +
            getPrettyDatetime(new Date(currentShort.closetime)) + "\t" +
            getPrettyDatetime(new Date(kline.closetime)) + "\t" +
            (currentShort.close + "").replace(".", ",") + "\t" +
            (kline.close + "").replace(".", ",") + "\t" +
            (((kline.close - currentShort.close) * -1) + "").replace(".", ",") + "\t" +
            (totalWin + "").replace(".", ",") + "\t"
  
          exportData(data, outputFileName);
  
          currentShort = null;
        }
      });

      // -- Events End
      
      let lastKline = klines[klines.length -1];
      let lastOpenTime = new Date(lastKline.opentime);
    
      while(lastKline) {
        klines = 
          await binance.getHistoricalKlines(
            {
              limit: 1500,
              startTime: lastKline.closetime + 1, 
            }
          );
  
        for(let i = 0; i < klines.length; i++) {
          strategy.addKline(klines[i]);
        }
  
        lastKline = klines[klines.length -1];
        if(lastKline) {
          lastOpenTime = new Date(lastKline.opentime);
          console.log(`${lastOpenTime} ${symbol} ${period} ${totalWin}`);
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