const {
    DB_USERNAME, DB_PASSWORD, DB_NAME, HOST_NAME
} = require('./config');
const { DIALECT } = require('../constants/constants');

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: HOST_NAME,
        dialect: DIALECT
    }
};
