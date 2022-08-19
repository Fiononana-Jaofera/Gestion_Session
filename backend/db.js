let mysql = require('mysql')
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql123#",
    database: "gestionSessionDB"
})
module.exports=con;