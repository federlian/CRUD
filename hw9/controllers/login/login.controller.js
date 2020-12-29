const tokenizer = require('../../helpers/tokinizer');
const { transactionInstance } = require('../../dataBase').getInstance();
const { loginService, userServices } = require('../../services');
const { errors: { OK_REQUEST, USER_DELETED } } = require('../../error');
const { AUTHORIZATION } = require('../../constants/constants');

module.exports = {
    login: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { id } = req.user;
            const { limit = 10, page = 1, ...where } = req.query;
            const offset = limit * (page - 1);
            const token_pair = tokenizer();
            const users = await userServices.findAllUsers(where, +limit, +offset);

            await loginService.createTokenPair({ user_id: id, ...token_pair }, transaction);

            await transaction.commit();
            res.status(OK_REQUEST.code).json(users);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const access_token = req.header(AUTHORIZATION);

            await loginService.deleteByParams({ access_token }, transaction);

            await transaction.commit();
            res.send(USER_DELETED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const refresh_token = req.get(AUTHORIZATION);

            await loginService.deleteByParams({ refresh_token }, transaction);

            const tokenPair = tokenizer();
            const { userId } = req;

            await loginService.createTokenPair({ ...tokenPair, userId }, transaction);

            await transaction.commit();
            res.json(tokenPair);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
