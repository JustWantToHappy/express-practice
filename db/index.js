const mysql = require("mysql")
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "101127txl",
    database: "node_server"
})
module.exports= db;