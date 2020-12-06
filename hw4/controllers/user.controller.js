const userService = require('../services/user.services');

module.exports = {
    createUser: async (req, res) => {
        try {
            const pushUser = await userService.insertUser(req.body);

            res.status(200).json(pushUser);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();

            res.status(200).json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserByEmail: async (req, res) => {
        try {
            const { email } = req.params;
            const user = await userService.findUserByEmail(email);

            res.status(200).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await userService.findUserById(id);

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
