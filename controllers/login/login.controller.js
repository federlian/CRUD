const { loginService, userServices } = require('../../services');
const tokenizer = require('../../helpers/tokinizer');
const { errors: { OK_REQUEST, USER_DELETED } } = require('../../error');
const { AUTHORIZATION } = require('../../constants/constants');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { id } = req.user;
            const { limit = 10, page = 1, ...where } = req.query;
            const offset = limit * (page - 1);
            const token_pair = tokenizer();
            await userServices.findAllUsers(where, +limit, +offset);

            await loginService.createTokenPair({ user_id: id, ...token_pair });

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.header(AUTHORIZATION);

            await loginService.deleteByParams({ access_token });

            res.send(USER_DELETED);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res) => {
        const refresh_token = req.get(AUTHORIZATION);

        await loginService.deleteByParams({ refresh_token });

        const tokenPair = tokenizer();
        const { userId } = req;

        await loginService.createTokenPair({ ...tokenPair, userId });

        res.json(tokenPair);
    }
};
