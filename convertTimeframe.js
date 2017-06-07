const convertTimeframe = (input, period) => {
  const intervalCount = Math.floor(input.length / period)

  let output = []

  for (let i = 0; i < intervalCount; i++) {
      let opens = [],
          highs = [],
          lows = [],
          closes = [],
          volumes = [];

      for (let j = 0; j < period; j++) {
        let elem = input[period * i + j]
        let o = elem.open
        let h = elem.high
        let l = elem.low
        let c = elem.close
        let v = elem.volume
        if (o > 0 && o !== null) opens.push(o)
        if (h > 0 && h !== null) highs.push(h)
        if (l > 0 && l !== null) lows.push(l)
        if (c > 0 && c !== null) closes.push(c)
        if (v >= 0 && v !== null) volumes.push(v)
      }

      let lastElem = input[period * i + (period - 1)]
      output.push({
        date: lastElem.date,
        time: lastElem.time,
        open: opens[0],
        low: Math.min.apply( Math, lows ),
        high: Math.max.apply( Math, highs ),
        close: closes[0],
        volume: volumes.reduce((a, b) => a + b, 0),
      })
  }
  return output;
}

module.exports = convertTimeframe
