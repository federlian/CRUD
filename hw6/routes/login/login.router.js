const { Router } = require('express');

const { userController } = require('../../controllers');
const { checkPasswordMiddleware, validationMiddleware } = require('../../middlewares');

const loginRouter = Router();

loginRouter.post('/', validationMiddleware.isUserCreateCorrect,
    checkPasswordMiddleware.checkPassword.checkPasswordHash,
    userController.getAllUsers);

module.exports = loginRouter;
