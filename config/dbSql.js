const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MARIADB_HOST || 'localhost',
  user: process.env.MARIADB_USER || 'root',
  password: process.env.MARIADB_PASSWORD || '888Infinity',
  database: 'junior',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
console.log("MARIADB_HOST from .env:", process.env.MARIADB_HOST);

module.exports = pool;