const userService = require('../services/user.services');

module.exports = {
    createUser: (req, res) => {
        try {
            const pushUser = userService.insertUser(req.body);

            res.status(201).json(pushUser);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUsers: (req, res) => {
        try {
            const users = userService.getAllUsers();

            res.status(200).json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserByEmail: (req, res) => {
        try {
            const { email } = req.params;
            const user = userService.findUserByEmail(email);

            res.status(200).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUser: (req, res) => {
        try {
            const { email } = req.params;
            const users = userService.removeUser(email);

            res.status(200).json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
