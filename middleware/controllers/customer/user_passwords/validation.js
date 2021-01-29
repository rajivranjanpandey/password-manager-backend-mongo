const Joi = require('joi');
const { sendLog } = requireG('helpers/log');

const createUserPasswordValidation = (req, res, next) => {
    const platformSchema = Joi.object().keys({
        password_label: Joi.string().required(),
        password_stream: Joi.string().required()
    })
    const schema = Joi.object().keys({
        platform_name: Joi.string().required(),
        platform_passwords: Joi.array().items(platformSchema).error(err => new Error('Invalid platform password type'))
    });
    schema.validateAsync(req.body)
        .then(() => next())
        .catch(err => sendLog(400, res, err, err.message));
}
const updateUserPasswordValidation = (req, res, next) => {
    const platformSchema = Joi.object().keys({
        // id: Joi.string(),
        password_label: Joi.string(),
        password_stream: Joi.string()
    })
    const schema = Joi.object().keys({
        platform_name: Joi.string(),
        platform_passwords: Joi.array().items(platformSchema).error(err => new Error('Invalid platform password type'))
    });
    schema.validateAsync(req.body)
        .then(() => next())
        .catch(err => sendLog(400, res, err, err.message));
}
module.exports = {
    createUserPasswordValidation,
    updateUserPasswordValidation
}