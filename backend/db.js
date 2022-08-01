let mysql = require('mysql')
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql123#",
    database: "adminList"
})
module.exports=con;