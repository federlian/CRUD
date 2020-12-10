const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddleware, validationMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', validationMiddleware.isUserCreateCorrect, userController.createUser);

userRouter.use('/:userId', validationMiddleware.isIdCorrect, userMiddleware.checkUserById);
userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', validationMiddleware.isUserUpdateCorrect, userMiddleware.checkUsersByEmail, userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

module.exports = userRouter;
