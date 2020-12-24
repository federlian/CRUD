module.exports = {
    checkPassword: require('./check-password-hash.middleware'),
    checkAccessTokens: require('./check-access-token.middleware'),
    checkRefreshTokens: require('./check-refresh-token.middleware')
};
