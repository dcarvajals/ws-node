//datos de la base de datos
const databd = require('./data_db.json');
const { Pool } = require('pg');

const config = {
    "user": databd.user,
    "host": databd.host,
    "password": databd.password,
    "database": databd.database
};

const pool = new Pool(config);

module.exports = pool;

