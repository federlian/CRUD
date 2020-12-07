const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userMiddleware.checkUserInDb, userController.getUsers);
userRouter.post('/', userMiddleware.checkUserExist, userController.createUser);
userRouter.get('/:id', userMiddleware.checkUserExist, userController.getUserById);
userRouter.get('/:email', userMiddleware.checkUserExist, userController.getUserByEmail);
userRouter.delete('/:email', userMiddleware.checkUserExist, userMiddleware.checkUsersByEmail, userController.deleteUser);

module.exports = userRouter;
