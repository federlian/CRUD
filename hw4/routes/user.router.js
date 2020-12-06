const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userMiddleware.checkUsers, userController.getUsers);
userRouter.post('/', userMiddleware.checkUsers, userController.createUser);
userRouter.get('/:id', userMiddleware.checkUsers, userController.getUserById);
userRouter.get('/:email', userMiddleware.checkUsers, userController.getUserByEmail);
userRouter.delete('/:email', userMiddleware.checkUsers, userMiddleware.checkMail, userController.deleteUser);

module.exports = userRouter;
