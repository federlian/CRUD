const { carService } = require('../../services');
const { ErrorInstance, errors: { ID_NOT_FOUND } } = require('../../error');

module.exports = {
    checkCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await carService.getCarById(carId);

            if (!car) {
                throw new ErrorInstance(ID_NOT_FOUND.message, ID_NOT_FOUND.code);
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    }

};
