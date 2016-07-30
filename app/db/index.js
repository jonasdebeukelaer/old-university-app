const mysql = require("mysql");
const conf = require('../conf');

const con = mysql.createConnection({
    host: conf.db.host,
    user: conf.db.user,
    password: conf.db.password,
    database: conf.db.database
});

module.exports = require('./methods')(con);