const db = require('mysql');

const connection = db.createConnection({
    host     : 'localhost',
    database : 'backoffice_mobile',
    user     : 'root',
    password : '',
})

module.exports = connection;