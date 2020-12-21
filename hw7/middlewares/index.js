module.exports = {
    userMiddleware: require('./user/user.middleware'),
    validationMiddleware: require('./validation/validation.middleware'),
    loginMiddleware: require('./login'),
    carMiddleware: require('./cars/car.middleware'),
    validationCarMiddleware: require('./validation/validationCar.middleware')
};
