const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const {
    DB_NAME, DB_PASSWORD, DB_USERNAME, HOST
} = require('../config/config');
const { DIALECT } = require('../constants/constants');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
            host: HOST,
            dialect: DIALECT
        });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model));
                    models[model] = modelFile(client, DataTypes);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
