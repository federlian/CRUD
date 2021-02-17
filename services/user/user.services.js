const db = require('../../dataBase').getInstance();

const { MODEL_USER } = require('../../constants/constants');

module.exports = {
    findAllUsers: (where = {}, limit = 10, offset = 0) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.findAll({
            where,
            limit,
            offset
        });
    },

    insertUser: (user) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.create(user);
    },

    findUserById: (userId) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.findByPk(userId);
    },

    findUserByParams: (obj) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.findOne({
            where: obj
        });
    },

    updateUser: (userId, newUser) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.update(newUser, {
            where: {
                id: userId
            },
            returning: true,
            plain: true
        });
    },

    removeUser: (userId) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.destroy({ where: { id: userId } });
    }

};
