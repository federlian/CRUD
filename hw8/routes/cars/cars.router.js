const { Router } = require('express');

const { carsController } = require('../../controllers');
const {
    carMiddleware,
    validationCarMiddleware,
    loginMiddleware,
    fileMiddleware
} = require('../../middlewares');

const carRouter = Router();

carRouter.get('/', validationCarMiddleware.checkInBase, carsController.getCars);
carRouter.post('/:userId',
    validationCarMiddleware.isCarCreateCorrect,
    loginMiddleware.checkAccess.checkAccessToken,
    fileMiddleware.checkFile.checkFilePhoto,
    carsController.createCar);
carRouter.use('/:userId',
    validationCarMiddleware.isCarIdCorrect,
    carMiddleware.checkCarById,
    loginMiddleware.checkAccess.checkAccessToken);
carRouter.get('/:userId', carsController.getCarById);
carRouter.put('/:userId',
    validationCarMiddleware.isCarUpdateCorrect,
    carsController.updateCar);
carRouter.delete('/:userId', carsController.deleteCar);

module.exports = carRouter;
