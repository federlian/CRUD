const { Router } = require('express');

const { loginController } = require('../../controllers');
const { loginMiddleware, validationMiddleware } = require('../../middlewares');

const loginRouter = Router();

loginRouter.post('/', validationMiddleware.isUserCreateCorrect,
    loginMiddleware.checkPassword.checkPasswordHash,
    loginController.login);
loginRouter.post('/logout', loginController.logoutUser);
loginRouter.post('/refresh', loginMiddleware.checkRefresh.checkRefreshToken, loginController.refreshToken);

module.exports = loginRouter;
