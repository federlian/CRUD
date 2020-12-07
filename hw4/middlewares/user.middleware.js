const userServices = require('../services/user.services');

module.exports = {
    checkUserInDb: (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (email && password) {
                throw new Error('User already created');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkUserExist: (req, res, next) => {
        try {
            const { id } = req.params;
            const usersList = userServices.findUserById(id);

            if (!usersList.length) {
                throw new Error('Users not registered');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkUsersByEmail: (req, res, next) => {
        try {
            const { email } = req.body;
            const searchEmail = userServices.findUserByEmail(email);

            if (!searchEmail) {
                throw new Error('Email not found');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
