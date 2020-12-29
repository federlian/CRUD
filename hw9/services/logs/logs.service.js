const LogsModel = require('../../dataBase/mongo-models/Log');

module.exports = {
    create: (logs) => new LogsModel(logs).save()
};
