const Joi = require('joi');
const { sendLog } = require('../../../../helpers/log');

const sendOtpValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        mobile: Joi.number().required().integer().min(1000000000).max(9999999999)
    });
    schema.validateAsync(req.body)
        .then(() => next())
        .catch((err) => sendLog(400, res, err, err.message));
}
const verifyOtpValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        mobile: Joi.number().required().integer().min(1000000000).max(9999999999),
        otp: Joi.number().required().integer().min(1000).max(9999)
    }).with('mobile', 'otp');
    schema.validateAsync(req.body)
        .then(() => next())
        .catch((err) => sendLog(400, res, err, err.message));
}
module.exports = {
    sendOtpValidation,
    verifyOtpValidation
}