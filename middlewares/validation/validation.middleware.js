const { ErrorInstance, errors: { NOT_VALID_ID, NOT_VALID_BODY } } = require('../../error');
const {
    userValidator: {
        newUserValidator,
        userIdValidator,
        updateUserValidator
    }
} = require('../../validators');

module.exports = {
    isIdCorrect: (req, res, next) => {
        try {
            const { error } = userIdValidator.validate(req.params);

            if (error) {
                throw new ErrorInstance(error.details[0].message, NOT_VALID_ID);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUpdateCorrect: (req, res, next) => {
        try {
            const { error } = updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorInstance(error.details[0].message, NOT_VALID_BODY);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserCreateCorrect: (req, res, next) => {
        try {
            const { error } = newUserValidator.validate(req.body);

            if (error) {
                throw new ErrorInstance(error.details[0].message, NOT_VALID_BODY);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
