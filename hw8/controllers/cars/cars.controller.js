const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid');

const { carService } = require('../../services');
const { errors: { CAR_CREATED, OK_REQUEST } } = require('../../error');

module.exports = {

    createCar: async (req, res, next) => {
        try {
            const car = await carService.createCar(req.body);

            const { photos, docs } = req;
            const pathWithoutPublic = path.join('cars', `${car.id}`, 'files');
            const fileDir = path.join(process.cwd(), 'public', pathWithoutPublic);

            if (photos.length) {
                await Promise.all(photos.map(async (i) => {
                    const format = i.name.split('.').pop();
                    const photo = `${uuid}.${format}`;
                    const finalPath = path.join(pathWithoutPublic, photo);

                    await fs.mkdir(fileDir, { recursive: true });
                    await i.mv(path.join(fileDir, photo));
                    await carService.insertFileToCar({ car_id: car.id, path: finalPath });

                    return 'File is upload';
                }));
            }

            if (docs.length) {
                await Promise.all(docs.map(async (i) => {
                    const format = i.name.split('.').pop();
                    const doc = `${uuid}.${format}`;
                    const finalPath = path.join(pathWithoutPublic, doc);

                    await fs.mkdir(fileDir, { recursive: true });
                    await i.mv(path.join(fileDir, doc));
                    await carService.insertFileToCar({ car_id: car.id, path: finalPath });

                    return 'File is upload';
                }));
            }

            res.status(CAR_CREATED).json(car);
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
            const pathFile = path.join(process.cwd(), 'public', 'car', carId);

            await fs.rmdir(pathFile, { recursive: true });
            await carService.deleteCar(carId);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    }
};
