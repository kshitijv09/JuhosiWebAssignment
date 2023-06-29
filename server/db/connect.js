const mysql = require("mysql2");

const connectDB = (/* { localhost, user, password, database } */) => {
  const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Surajpura@1",
    database: "auth",
  });
  return db;
};
module.exports = connectDB;
