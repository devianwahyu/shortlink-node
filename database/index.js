require('dotenv').config()

const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
})

db.query('SELECT 1+1 AS RESULT', (req, res) => { console.log('Connected to database') })

module.exports = db