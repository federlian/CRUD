const db = require('../../dataBase').getInstance();

const { MODEL_CAR, MODEL_USER } = require('../../constants/constants');

module.exports = {
    findAllUsers: (where = {}, limit = 10, offset = 0) => {
        const UserModel = db.getModel(MODEL_USER);
        const CarModel = db.getModel(MODEL_CAR);

        return UserModel.findAll({
            where,
            include: [{ model: CarModel }],
            limit,
            offset
        });
    },

    insertUser: (user, transaction) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.create(user, { transaction });
    },

    findUserById: (userId) => {
        const UserModel = db.getModel(MODEL_USER);
        const CarModel = db.getModel(MODEL_CAR);

        return UserModel.findByPk(userId, { include: CarModel });
    },

    findUserByParams: (obj) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.findOne({
            where: obj
        });
    },

    updateUser: (userId, newUser, transaction) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.update(newUser, {
            where: {
                id: userId
            },
            returning: true,
            plain: true,
            transaction
        });
    },

    removeUser: (userId, transaction) => {
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.destroy({
            where: { id: userId },
            transaction
        });
    }

};
