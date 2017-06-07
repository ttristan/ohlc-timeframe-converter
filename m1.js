const csv = require("fast-csv")
const fs = require("fs")
const path = require("path")

const con = require('./connection.js')

const expectedDataTime = (time) => {
  if (typeof time === "string") time = time.split(":").map(elem => parseInt(elem))

  let h = time[0]
  let m = time[1]

  let mE = 0
  let hE = 0
  if (m === 59) {
    mE = 0
    hE = h + 1
  } else if (m >= 0) {
    mE = m + 1
    hE = h
  }
  if (hE === 24) {
    hE = 0
  }

  return [hE, mE]
}

let previous = null
const insert = (data) => {
  if (previous !== null) {
    let current = data[1].split(":").map(elem => parseInt(elem))
    let expect = expectedDataTime(previous)
    let gap = ((current[0] * 60) + current[1]) - ((expect[0] * 60) + expect[1])
    if (gap > 0) {
      console.log("gap", gap);
      for (let i = 0; i < gap; i++) {
        expect[1] += i
        if (String(expect[0]).length === 1) expect[0] = "0" + String(expect[0]);
        if (String(expect[1]).length === 1) expect[1] = "0" + String(expect[1]);

        let time = expect.join(":")
        let sql = `INSERT INTO m1 (date, time, open, high, low, close, volume) VALUES ('${data[0]}', '${time}', null, null, null, null, null)`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
    }
  }
  previous = data[1].split(":").map(elem => parseInt(elem))
  console.log("data", data);
  let sql = `INSERT INTO m1 (date, time, open, high, low, close, volume) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

const stream = fs.createReadStream("data.csv");
const csvStream = csv()
    .on("data", function(data){
         insert(data);
    })
    .on("end", function(){
         console.log("done");
    });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  stream.pipe(csvStream);
});
