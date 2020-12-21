module.exports = {
    checkPassword: require('./check-password-hash.middleware'),
    checkAccessToken: require('./check-access-token.middleware'),
    checkRefreshToken: require('./check-refresh-token.middleware')
};
