const Joi = require('joi');
const { CURRENT_YEAR } = require('../../constants/constants');

module.exports = Joi.object({
    model: Joi.string().min(3).max(30)
        .required(),
    customer: Joi.string().required(),
    year: Joi.number().required().min(1990).max(CURRENT_YEAR)
        .required(),
});
