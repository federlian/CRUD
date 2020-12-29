const Joi = require('joi');

module.exports = Joi.object({
    userId: Joi.number().integer().required()
});
