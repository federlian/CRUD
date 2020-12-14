const { Router } = require('express');

const { userController } = require('../../controllers');
const { userMiddleware, validationMiddleware } = require('../../middlewares');

const userRouter = Router();

userRouter.post('/', validationMiddleware.isUserCreateCorrect, userMiddleware.checkUsersByEmail, userController.createUser);

module.exports = userRouter;
