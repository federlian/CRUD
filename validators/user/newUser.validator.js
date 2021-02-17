const Joi = require('joi');

const { regExp: { EMAIL, PASSWORD } } = require('../../config');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(3).max(30)
        .required(),
    email: Joi.string().regex(EMAIL).required(),
    password: Joi.string().regex(PASSWORD).required(),
    confirm_token: Joi.string().required(),
    confirmed: Joi.boolean()
});
