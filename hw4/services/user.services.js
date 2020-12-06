const db = require('../dataBase').getInstance();

module.exports = {
    getAllUsers: () => {
        const UserModel = db.getModel('User');

        return UserModel.findAll();
    },

    insertUser: (user) => {
        const UserModel = db.getModel('User');

        return UserModel.create(user);
    },

    findUserByEmail: (email) => {
        const UserModel = db.getModel('User');

        return UserModel.findAll({ where: { email } });
    },

    findUserById: (id) => {
        const UserModel = db.getModel('User');
        const CarModel = db.getModel('Car');

        return CarModel.findAll({
            where: { id },
            include: { model: UserModel, as: 'user' }
        });
    },

    removeUser: (email) => {
        const UserModel = db.getModel('User');

        return UserModel.destroy({ where: { mail: email } });
    }

};
