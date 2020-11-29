const { func } = require("joi");

const createError = (statusCode, message = 'We are facing some issues.', res, errorLog) => {
    if (errorLog)
        console.log(errorLog);
    else
        console.log(message);
    res.status(statusCode).json({ message });
}
module.exports = {
    createError
}