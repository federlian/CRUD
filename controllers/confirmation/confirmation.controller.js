const { userServices } = require('../../services');
const { ErrorInstance, errors: { NOT_VALID_TOKEN, OK_REQUEST } } = require('../../error');

module.exports = {
    confirmEmail: async (req, res, next) => {
        try {
            const { token } = req.params;
            const { confirm_token, id } = req.body;

            if (token !== confirm_token) {
                throw new ErrorInstance(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            if (token === confirm_token) {
                await userServices.updateUser(id, { confirmed: true });

                res.redirect('/login');
            }
            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    }
};
