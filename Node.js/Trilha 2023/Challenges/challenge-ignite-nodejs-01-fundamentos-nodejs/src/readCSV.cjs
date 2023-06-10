const fs = require("fs");
const { parse } = require("csv-parse");

const migration_data = './migration_data.csv';
const posts_data = '../posts.csv'

fs.createReadStream(posts_data)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });