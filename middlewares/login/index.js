module.exports = {
    checkPassword: require('./check-password-hash.middleware'),
    checkAccess: require('./check-access-token.middleware'),
    checkRefresh: require('./check-refresh-token.middleware')
};
