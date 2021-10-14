const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

const withdbConfig = {
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT
};

// TODO Configure pooling, reuse connections - Sequilize?
// Create a connection to the database
const connection = mysql.createConnection(withdbConfig);

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;