const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'susylau'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conexión exitosa a MySQL');
});

module.exports = connection;
