const { userService } = require('../../services');
const { errors: { USER_CREATED, OK_REQUEST, USER_DELETED } } = require('../../error');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            await userService.insertUser(req.body);

            res.status(USER_CREATED.code).json(USER_CREATED.message);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const { limit = 10, page = 1, ...where } = req.query;
            const offset = limit * (page - 1);

            await userService.findAllUsers(where, +limit, +offset);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
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

            await userService.updateUser(userId, req.body);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.removeUser(userId);

            res.status(USER_DELETED.code).json(USER_DELETED.message);
        } catch (e) {
            next(e);
        }
    }
};
