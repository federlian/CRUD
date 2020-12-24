const userServices = require('../../services/user/user.services');
const { ErrorInstance, errors: { EMAIL_EXIST, ID_NOT_FOUND } } = require('../../error');

module.exports = {
    checkUsersByEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const [user] = await userServices.findAllUsers({ email }, 1);

            if (user) {
                throw new ErrorInstance(EMAIL_EXIST.message, EMAIL_EXIST.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userServices.findUserById(userId);

            if (!user) {
                throw new ErrorInstance(ID_NOT_FOUND.message, ID_NOT_FOUND.code);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
