const jwt = require('jsonwebtoken');

const { REFRESH_TOKEN_SECRET } = require('../../config/config');
const { ErrorInstance, errors: { ID_NOT_FOUND, NOT_VALID_TOKEN } } = require('../../error');
const { loginService } = require('../../services');
const { AUTHORIZATION } = require('../../constants/constants');

module.exports = {
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorInstance(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err) => {
                if (err) {
                    throw new ErrorInstance(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
                }
            });

            const userWithToken = await loginService.getTokenWithUserByParams({ refresh_token });

            if (!userWithToken) {
                throw new ErrorInstance(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            if (userWithToken.id !== +req.params.userId) {
                throw new ErrorInstance(ID_NOT_FOUND.message, ID_NOT_FOUND.code);
            }

            req.user = userWithToken;

            next();
        } catch (e) {
            next(e);
        }
    }
};
