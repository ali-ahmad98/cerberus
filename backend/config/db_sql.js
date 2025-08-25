const {createPool} = require('mysql');
const config = require('./config');

const db = createPool({
    host: config.mysql_localdb.host,
    user: config.mysql_localdb.user,
    database: config.mysql_localdb.database,
    password: config.mysql_localdb.password,
    connectionLimit: 10
});

db.query(`SELECT id FROM users`, (err, res) => {
    return console.log(res);
})

module.exports  = db;