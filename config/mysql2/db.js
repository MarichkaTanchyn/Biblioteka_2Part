const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'msdb',
    user: 'root',
    password: 'root'
    // socketPath: '/var/run/mysqld/mysqld.sock'
});

module.exports = pool;