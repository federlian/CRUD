const db = require('../../dataBase').getInstance();

const { MODEL_CAR, MODEL_DOCUMENT } = require('../../constants/constants');

module.exports = {
    createCar: (car) => {
        const CarModel = db.getModel(MODEL_CAR);

        return CarModel.create(car);
    },

    insertFileToCar: (file) => {
        const DocumentModel = db.getModel(MODEL_DOCUMENT);

        return DocumentModel.create(file);
    },

    getAllCars: (where = {}, limit = 10, offset = 0) => {
        const CarModel = db.getModel(MODEL_CAR);

        return CarModel.findAll({
            where,
            limit,
            offset
        });
    },

    getCarById: (carId) => {
        const CarModel = db.getModel(MODEL_CAR);

        return CarModel.findByPk(carId);
    },

    updateCar: (carId, newCar) => {
        const CarModel = db.getModel(MODEL_CAR);

        return CarModel.update(newCar, { where: { id: carId } });
    },

    deleteCar: (carId) => {
        const CarModel = db.getModel(MODEL_CAR);

        return CarModel.destroy({
            where: { id: carId }
        });
    }
};
