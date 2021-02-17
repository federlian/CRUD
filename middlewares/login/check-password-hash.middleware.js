const { passwordHelper } = require('../../helpers');
const { userServices } = require('../../services');
const { ErrorInstance, errors: { WRONG_EMAIL_OR_PASSWORD, NOT_CONFIRM_TOKEN } } = require('../../error');

module.exports = {
    checkPasswordHash: async (req, res, next) => {
        try {
            const { confirmed, password, email } = req.body;

            const user = await userServices.findUserByParams({ email });

            if (!user) {
                throw new ErrorInstance(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code);
            }

            if (!confirmed) {
                throw new ErrorInstance(NOT_CONFIRM_TOKEN.code, NOT_CONFIRM_TOKEN.message);
            }

            await passwordHelper.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
