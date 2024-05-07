const mysql = require('mysql2');

const conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'12345678',
  database:'funcTest',
})

