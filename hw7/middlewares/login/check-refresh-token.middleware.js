const jwt = require('jsonwebtoken');

const { REFRESH_TOKEN_SECRET } = require('../../config/config');
const { ErrorInstance, errors } = require('../../error');
const { loginService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const refresh_token = req.get('Authorization');

        if (!refresh_token) {
            throw new ErrorInstance(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
        }

        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err) => {
            if (err) {
                throw new ErrorInstance(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
            }
        });

        const userWithToken = await loginService.getTokenWithUserByParams({ refresh_token });

        if (!userWithToken) {
            throw new ErrorInstance(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
        }

        if (userWithToken.id !== +req.params.userId) {
            throw new ErrorInstance(errors.NOT_VALID_ID.message, errors.NOT_VALID_ID.code);
        }

        req.user = userWithToken;

        next();
    } catch (e) {
        next(e);
    }
};
