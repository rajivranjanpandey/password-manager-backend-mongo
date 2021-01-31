const { sendLog } = requireG("helpers/log");
const joi = require("joi");

const updateUserProfileValidation = (req, res, next) => {
    const profileSchema = joi.object().keys({
        name: joi.string().required(),
        mobile: joi.number().min(1000000000).max(9999999999).required()
    });
    profileSchema.validateAsync(req.body)
        .then(() => next())
        .catch(e => sendLog(400, res, e, e.message))
}
module.exports = {
    updateUserProfileValidation
}