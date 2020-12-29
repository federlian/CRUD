const { ErrorInstance, errors: { NOT_VALID_ID, NOT_VALID_BODY, NOT_EXIST_IN_BASE } } = require('../../error');
const {
    carValidator: {
        carIdValid,
        newCarValid,
        updateCarValid
    }
} = require('../../validators');
const { carService } = require('../../services');

module.exports = {
    checkInBase: async (req, res, next) => {
        try {
            const cars = await carService.getAllCars();

            if (!cars.length) {
                throw new ErrorInstance(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarIdCorrect: (req, res, next) => {
        try {
            const { error } = carIdValid.validate(req.params);

            if (error) {
                throw new ErrorInstance(error.details[0].message, NOT_VALID_ID);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isCarUpdateCorrect: (req, res, next) => {
        try {
            const { error } = updateCarValid.validate(req.body);

            if (error) {
                throw new ErrorInstance(error.details[0].message, NOT_VALID_BODY);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarCreateCorrect: (req, res, next) => {
        try {
            const { error } = newCarValid.validate(req.body);

            if (error) {
                throw new ErrorInstance(error.details[0].message, NOT_VALID_BODY);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
