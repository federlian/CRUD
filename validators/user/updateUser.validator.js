const Joi = require('joi');

const { regExp: { EMAIL, PASSWORD } } = require('../../config');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().regex(EMAIL),
    password: Joi.string().regex(PASSWORD)
});
