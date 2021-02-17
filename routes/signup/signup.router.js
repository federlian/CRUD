const { Router } = require('express');

const { userController } = require('../../controllers');
const {
    fileMiddleware,
    userMiddleware,
    validationMiddleware
} = require('../../middlewares');

const userRouter = Router();

userRouter.post('/',
    validationMiddleware.isUserCreateCorrect,
    userMiddleware.checkUsersByEmail,
    fileMiddleware.checkAvatar.checkAvatar,
    userController.createUser);

module.exports = userRouter;
