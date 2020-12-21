const { Router } = require('express');

const { userController } = require('../../controllers');
const { userMiddleware, validationMiddleware, loginMiddleware } = require('../../middlewares');

const userRouter = Router();

userRouter.use('/:userId', validationMiddleware.isIdCorrect, userMiddleware.checkUserById, loginMiddleware.checkAccessToken);
userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', validationMiddleware.isUserUpdateCorrect, userMiddleware.checkUsersByEmail, userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

module.exports = userRouter;
