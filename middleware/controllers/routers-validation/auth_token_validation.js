const { JWT_SALT } = requireG("config/secret_keys");
const { sendLog } = requireG("helpers/log");
const jwt = require('jsonwebtoken');
const { Users } = require("../../../models");

const validateAuthToken = async (req, res, next) => {
    const token = req.header('X-Auth-Token');
    if (token) {
        try {
            const decodedToken = jwt.verify(token, JWT_SALT);
            console.log('decodedToken', decodedToken)
            if (decodedToken.id) {
                const user = await Users.findById(decodedToken.id);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    sendLog(401, res, null, 'User not found')
                }
            } else {
                sendLog(401, res, null, 'Unauthorised Access');
            }
        } catch (e) {
            sendLog(401, res, null, 'Invalid Token');
        }

    } else {
        sendLog(403, res, null, 'Absence of X-Auth-Token');
    }
}
module.exports = validateAuthToken;
