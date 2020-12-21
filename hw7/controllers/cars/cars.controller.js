const { carService } = require('../../services');
const { errors: { OK_REQUEST } } = require('../../error');

module.exports = {

    createCar: async (req, res, next) => {
        try {
            const car = await carService.createCar(req.body);

            res.status(OK_REQUEST).json(car);
        } catch (e) {
            next(e);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const { limit = 10, page = 1, ...where } = req.query;
            const offset = limit * (page - 1);

            const cars = await carService.getAllCars(where, +limit, +offset);

            res.status(OK_REQUEST.code).json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            await res.json(req.car);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.updateCar(carId, req.body);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    }
};
