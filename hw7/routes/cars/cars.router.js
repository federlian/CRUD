const { Router } = require('express');

const { carsController } = require('../../controllers');
const { carMiddleware, validationCarMiddleware, loginMiddleware } = require('../../middlewares');

const carRouter = Router();

carRouter.get('/', validationCarMiddleware.checkInBase, carsController.getCars);
carRouter.post('/', validationCarMiddleware.isCarCreateCorrect, loginMiddleware.checkAccessToken, carsController.createCar);
carRouter.use('/:userId', validationCarMiddleware.isCarIdCorrect, carMiddleware.checkCarById);
carRouter.get('/:userId', carsController.getCarById);
carRouter.put('/:userId', validationCarMiddleware.isCarUpdateCorrect, carsController.updateCar);
carRouter.delete('/:userId', carsController.deleteCar);

module.exports = carRouter;
