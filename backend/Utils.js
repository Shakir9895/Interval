const mysql = require('mysql2');


//mySql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kallungal',
    database: 'db3',
})

module.exports = db;