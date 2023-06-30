const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Surajpura@1",
  database: "auth",
});

module.exports = db;
