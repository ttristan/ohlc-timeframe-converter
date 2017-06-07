Converts OHLC 1 minute data points (forex) to higher timeframes (e.g. 5 minutes)

**Warning**: This is a discarded idea and just a first hacked approach to solve the problem.

## Current version
- `m1.js` reads 1m Forex data from a csv file (downloaded from http://www.histdata.com/download-free-forex-data/) using the node module `fast-csv` and stores it into a mysql DB
- `m5.js` fetches the m1 data from the DB and used `convertTimeframe.js` to convert the data to the m5 timeframe

**Note:**
- I noticed that the 1m data from histdata.com is sometimes missing data points. I coded a workaround so that null values will be inserted for that 1 minute data point.
- `convertTimeframe.js` will skip data sets with null values, instead the next entry/close will be taken to calculate the higher timeframe

## Install & Contribute
```
$ git clone
$ npm install
```

## Dependencies
- node/npm
- mysql
- fast-csv
