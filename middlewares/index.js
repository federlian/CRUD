module.exports = {
    userMiddleware: require('./user/user.middleware'),
    validationMiddleware: require('./validation/validation.middleware'),
    loginMiddleware: require('./login'),
    fileMiddleware: require('./file')
};
