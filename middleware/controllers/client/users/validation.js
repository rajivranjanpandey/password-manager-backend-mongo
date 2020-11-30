const Joi = require('joi');
const { sendLog } = require('../../../../helpers/log');

const sendOtpValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        mobile: Joi.number().required().max(10)
    });
    schema.validateAsync(req.body)
        .then(() => next())
        .catch((err) => sendLog(400, res, err, err.message));
}
const verifyOtpValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        mobile: Joi.number().required().max(10),
        otp: Joi.number().required().min(4).max(4)
    }).with('mobile', 'otp');
    schema.validateAsync(req.body)
        .then(() => next())
        .catch((err) => sendLog(400, res, err, err.message));
}
module.exports = {
    sendOtpValidation,
    verifyOtpValidation
}