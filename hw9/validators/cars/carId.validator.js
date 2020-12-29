const Joi = require('joi');

module.exports = Joi.object({
    carId: Joi.number().integer().required()
});
