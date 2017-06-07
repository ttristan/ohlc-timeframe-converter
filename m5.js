
const con = require('./connection.js')
const convertTimeframe = require('./convertTimeframe.js')


const select = () => {
  let sql = `SELECT * FROM m1`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    write(result)
  });
}

const write = (dataSet) => {
  let newDataSet = convertTimeframe(dataSet, 5)
  for (let i = 0; i < newDataSet.length; i++) {
    let data = Object.values(newDataSet[i]).map(elem => String(elem))
    let sql = `INSERT INTO m5 (date, time, open, high, low, close, volume) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }


}
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  select()
});
