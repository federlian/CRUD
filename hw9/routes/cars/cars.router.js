const { Router } = require('express');

const { carsController } = require('../../controllers');
const {
    carMiddleware,
    fileMiddleware,
    validationCarMiddleware
} = require('../../middlewares');

const carRouter = Router();

carRouter.get('/', validationCarMiddleware.checkInBase, carsController.getCars);

carRouter.post('/',
    validationCarMiddleware.isCarCreateCorrect,
    fileMiddleware.checkFile.checkFilePhoto,
    carsController.createCar);

carRouter.use('/:carId',
    validationCarMiddleware.isCarIdCorrect,
    carMiddleware.checkCarById);

carRouter.get('/:carId', carsController.getCarById);

carRouter.put('/:carId',
    validationCarMiddleware.isCarUpdateCorrect,
    carsController.updateCar);

carRouter.delete('/:carId', carsController.deleteCar);

module.exports = carRouter;
