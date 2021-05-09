const mysql = require('mysql2');
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

function createJawsConn() {
  let connection = mysql.createConnection(process.env.JAWSDB_URL);
  let JAWSARR = process.env.JAWSDB_URL.split('/');
  connection.query(`CREATE DATABASE IF NOT EXISTS ${JAWSARR[JAWSARR.length - 1]}`);
}

function createLocalConn() {
  let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW
  });
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
}
  // if running from heroku create jawsdb database, use it, and return sequelize instance
if (process.env.JAWSDB_URL) {
  createJawsConn();
  sequelize = new Sequelize(process.env.JAWSDB_URL);
// if running locally, create local database, use it, and return sequelize instance
} else {
  createLocalConn();
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    }
  });
}

module.exports = sequelize;
