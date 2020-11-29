const Joi = require('joi');
const { createError } = require('../../../../helpers/error');

const userCreateValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        mobile: Joi.number().required().max(10),
        otp: Joi.number().required().min(4).max(4)
    }).with('mobile', 'otp');
    schema.validateAsync(req.body)
        .then(() => next())
        .catch((err) => createError(400, err.message, res));
}
module.exports = {
    userCreateValidation
}