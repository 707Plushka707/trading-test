const { getPrettyDatetime } = require('./utils/date');
const { exportData, removeFile } = require('./utils/file');


const BASEASSET = 100;

class Funds {
    
    #outputFileName = "";
    currentLong = null;
    currentShort = null;
    totalWin = 0;


    constructor(outputFileName) {
        this.outputFileName = outputFileName;
        this.totalWin = 0
    }

    openLong = (kline) => {
            if(!this.currentLong) {
                this.currentLong = kline;
            }
        }

    openShort = (kline) => {
        if(!this.currentShort) {
            this.currentShort = kline;
        }
      }

    closeLong = (kline) => {
        if(this.currentLong) {
          const winPercent = ((kline.close - this.currentLong.close)/this.currentLong.close);
          this.totalWin += BASEASSET * winPercent;
  
          const data = 
            "close long" + "\t" +
            getPrettyDatetime(new Date(this.currentLong.closetime)) + "\t" +
            getPrettyDatetime(new Date(kline.closetime)) + "\t" +
            (this.currentLong.close + "").replace(".", ",") + "\t" +
            (kline.close + "").replace(".", ",") + "\t" +
            ((kline.close - this.currentLong.close) + "").replace(".", ",") + "\t" +
            (((kline.close - this.currentLong.close)/this.currentLong.close) + "").replace(".", ",") + "\t" +
            (this.totalWin + "").replace(".", ",") + "\t"
  
          exportData(data, this.outputFileName);
  
          this.currentLong = null;
        }
      }

    closeShort = (kline) => {
        if(this.currentShort) {
          const winPercent = (((kline.close - this.currentShort.close) * -1)/this.currentShort.close);
          this.totalWin += BASEASSET * winPercent;
  
          const data = 
            "close short" + "\t" +
            getPrettyDatetime(new Date(this.currentShort.closetime)) + "\t" +
            getPrettyDatetime(new Date(kline.closetime)) + "\t" +
            (this.currentShort.close + "").replace(".", ",") + "\t" +
            (kline.close + "").replace(".", ",") + "\t" +
            (((kline.close - this.currentShort.close) * -1) + "").replace(".", ",") + "\t" +
            ((((kline.close - this.currentShort.close) * -1)/this.currentShort.close) + "").replace(".", ",") + "\t" +
            (this.totalWin + "").replace(".", ",") + "\t"
  
          exportData(data, this.outputFileName);
  
          this.currentShort = null;
        }
      }
}

module.exports = Funds;