let mysql = require('mysql')
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql123#",
    database: "mydb"
})



module.exports=con;