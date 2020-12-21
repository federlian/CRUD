const { userServices } = require('../../services');
const { errors: { USER_CREATED, OK_REQUEST, USER_DELETED } } = require('../../error');
const { passwordHelper: { hash } } = require('../../helpers');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const password = await hash(req.body.password);

            Object.assign(req.body, { password });

            await userServices.insertUser(req.body);

            res.status(USER_CREATED.code).json(USER_CREATED.message);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            await res.json(req.user);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userServices.updateUser(userId, req.body);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userServices.removeUser(userId);

            res.status(USER_DELETED.code).json(USER_DELETED.message);
        } catch (e) {
            next(e);
        }
    }
};
