require("dotenv").config();
const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

dbConnection.connect((error) => {
  if (error) throw error;
  console.log("Database Connected Successfully");
});

module.exports = dbConnection;
