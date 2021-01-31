const { sendLog } = requireG('helpers/log');
const { Users } = require("../../../../models");

// GET:: USER DETAILS FROM AUTH TOKEN
getUserDetails = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(user.toJSON());
    } catch (e) {
        next(new Error(e))
    }
}
// PUT:: UPDATE USER DETAILS
updateUserDetails = async (req, res, next) => {
    try {
        const user = req.user;
        if (user) {
            const updatePayload = req.body;
            if (updatePayload.mobile !== user.mobile) {
                const userFound = await Users.exists({ mobile: updatePayload.mobile });
                if (userFound) {
                    sendLog(400, res, null, 'Mobile number already exists');
                } else {
                    user.mobile = updatePayload.mobile;
                }
            }
            if (updatePayload.name !== user.name) {
                user.name = updatePayload.name;
            }
            await user.save();
            res.status(200).json(user.toJSON());
        }
    } catch (e) {
        next(new Error(e))
    }
}
module.exports = {
    getUserDetails,
    updateUserDetails
}