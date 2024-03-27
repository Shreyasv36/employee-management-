var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  database: "employee",
  user: "root",
  password: "Shreyas@1234",
});

module.exports = con;