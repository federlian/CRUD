const db = require('../../dataBase').getInstance();

const { MODEL_USER, MODEL_O_AUTH } = require('../../constants/constants');

module.exports = {
    createTokenPair: (tokenPair, transaction) => {
        const OAuthModel = db.getModel(MODEL_O_AUTH);

        return OAuthModel.create(tokenPair, transaction);
    },

    getTokenWithUserByParams: (findObject) => {
        const OAuthModel = db.getModel(MODEL_O_AUTH);
        const UserModel = db.getModel(MODEL_USER);

        return UserModel.findOne({
            include: {
                model: OAuthModel,
                where: findObject
            }
        });
    },

    deleteByParams: (findObject, transaction) => {
        const OAuthModel = db.getModel(MODEL_O_AUTH);

        return OAuthModel.destroy({
            where: findObject,
            transaction,
            truncate: true
        });
    }
};
