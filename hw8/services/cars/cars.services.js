const db = require('../../dataBase').getInstance();

module.exports = {
    createCar: (car) => {
        const CarModel = db.getModel('Car');

        return CarModel.create(car);
    },

    insertFileToCar: (file) => {
        const DocumentModel = db.getModel('Document');

        return DocumentModel.create(file);
    },

    getAllCars: (where = {}, limit = 10, offset = 0) => {
        const CarModel = db.getModel('Car');

        return CarModel.findAll({
            where,
            limit,
            offset
        });
    },

    getCarById: (carId) => {
        const CarModel = db.getModel('Car');

        return CarModel.findByPk(carId);
    },

    updateCar: (carId, newCar) => {
        const CarModel = db.getModel('Car');

        return CarModel.update(newCar, { where: { id: carId } });
    },

    deleteCar: (carId) => {
        const CarModel = db.getModel('Car');

        return CarModel.destroy({
            where: { id: carId }
        });
    }
};
