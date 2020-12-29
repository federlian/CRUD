const db = require('../../dataBase').getInstance();

const { MODEL_CAR, MODEL_DOCUMENT } = require('../../constants/constants');

module.exports = {
    createCar: (car, transaction) => {
        const CarModel = db.getModel(MODEL_CAR);

        return CarModel.create(car, { transaction });
    },

    insertFileToCar: (file, transaction) => {
        const DocumentModel = db.getModel(MODEL_DOCUMENT);

        return DocumentModel.create(file, { transaction });
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

    updateCar: (carId, newCar, transaction) => {
        const CarModel = db.getModel(MODEL_CAR);

        return CarModel.update(newCar, {
            where: { id: carId },
            transaction
        });
    },

    deleteCar: (carId, transaction) => {
        const CarModel = db.getModel(MODEL_CAR);

        return CarModel.destroy({
            where: { id: carId },
            transaction
        });
    }
};
