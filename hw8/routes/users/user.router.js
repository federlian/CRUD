const { Router } = require('express');

const {
    loginMiddleware,
    userMiddleware,
    validationMiddleware
} = require('../../middlewares');

const { userController, loginController } = require('../../controllers');

const userRouter = Router();

userRouter.use('/:userId',
    validationMiddleware.isIdCorrect,
    userMiddleware.checkUserById,
    loginMiddleware.checkAccess.checkAccessToken);

userRouter.get('/:userId', userController.getUserById);

userRouter.put('/:userId',
    validationMiddleware.isUserUpdateCorrect,
    userMiddleware.checkUsersByEmail,
    userController.updateUser);

userRouter.delete('/:userId', loginController.logoutUser, userController.deleteUser);

module.exports = userRouter;
