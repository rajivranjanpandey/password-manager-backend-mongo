const { func } = require("joi");

const sendLog = (statusCode, res, errorLog, message = 'We are facing some issues.') => {
    if (errorLog)
        console.log(errorLog);
    else
        console.log(message);
    res.status(statusCode).json({ message });
}
module.exports = {
    sendLog
}