const cron = require('node-cron');
const { CRON_EXPRESSION } = require('../config/config');
const { DELETE_TOKENS } = require('../constants/constants');

const deleteTokens = require('./delete-tokens');

module.exports = () => {
    cron.schedule(CRON_EXPRESSION, async () => {
        await deleteTokens();
        console.log(DELETE_TOKENS);
    });
};
