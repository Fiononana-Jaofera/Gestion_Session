let mysql = require('mysql')
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jaofera@3110",
    database: "adminList"
})

module.exports=con;