const { ErrorInstance, errors: { NOT_VALID_ID, NOT_VALID_BODY } } = require('../../error');

module.exports = {
    isIdCorrect: (req, res, next) => {
        try {
            const { userId } = req.params;

            if (!userId || userId < 0 || !Number.isInteger(+userId)) {
                throw new ErrorInstance(NOT_VALID_ID.message, NOT_VALID_ID.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUpdateCorrect: (req, res, next) => {
        try {
            const {
                email, name, password
            } = req.body;

            if (email && email.length < 5) {
                throw new ErrorInstance(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            if (name && name.length < 3) {
                throw new ErrorInstance(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            if (password && password.length < 8) {
                throw new ErrorInstance(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserCreateCorrect: (req, res, next) => {
        try {
            const {
                email, name, password
            } = req.body;

            if (!email || email.length < 5) {
                throw new ErrorInstance(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            if (!name || name.length < 3) {
                throw new ErrorInstance(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            if (!password || password.length < 8) {
                throw new ErrorInstance(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
