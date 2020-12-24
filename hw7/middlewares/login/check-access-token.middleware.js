const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('../../config/config');
const { ErrorInstance, errors } = require('../../error');
const { loginService } = require('../../services');
const { AUTHORIZATION } = require('../../constants/constants');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorInstance(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
            }

            jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err) => {
                if (err) {
                    throw new ErrorInstance(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
                }
            });

            const userWithToken = await loginService.getTokenWithUserByParams({ access_token });

            if (!userWithToken) {
                throw new ErrorInstance(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
            }

            if (userWithToken.id !== +req.params.userId) {
                throw new Error('PERMISSION');
            }

            req.user = userWithToken;

            next();
        } catch (e) {
            next(e);
        }
    }
};
