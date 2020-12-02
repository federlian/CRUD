const { users } = require('../dataBase');

module.exports = {
    isUser: (req, res, next) => {
        try {
            const { email, password } = req.body;
            const search = users.find((user) => user.email === email && user.password === password);

            if (search) {
                throw new Error('User already created');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkUsers: (req, res, next) => {
        try {
            const usersList = req.body;

            if (!usersList) {
                throw new Error('Users not found');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkMail: (req, res, next) => {
        try {
            const { email } = req.body;
            const searchEmail = users.find((user) => user.email === email);

            if (!searchEmail) {
                throw new Error('Email not found');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
