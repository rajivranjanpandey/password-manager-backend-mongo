const { sendLog } = requireG("helpers/log");
const { generateRandomNumber } = requireG("helpers/misc");
const { Users, TempOtp, UserPasswords } = require("../../../../models");

// POST:: GET OTP
const getOtpForUser = async (req, res, next) => {
    try {
        const mobile = req.body.mobile;
        const newOtp = generateRandomNumber(4);
        const prevRecord = await TempOtp.findByMobile(mobile);
        if (prevRecord) {
            prevRecord.otp = newOtp;
            await prevRecord.save();
        } else {
            await TempOtp.create({
                mobile,
                otp: newOtp
            });
        }
        sendLog(201, res, null, `Otp is ${newOtp}`);

    } catch (e) {
        next(new Error(e))
    }
}
// POST:: VERIFY OTP
const verifyOtpForUser = async (req, res, next) => {
    try {
        const { mobile, otp } = req.body;
        const currRecord = await TempOtp.findByMobile(mobile);
        console.log(currRecord);
        if (currRecord) {
            if (currRecord.otp === otp) {
                let user = await Users.findByMobile(mobile);
                if (!user) {
                    user = await Users.create({ mobile });
                }
                await TempOtp.deleteOne({ mobile });
                await UserPasswords.create({
                    user_id: user._id,
                    platform_name: 'X',
                    platform_passwords: [{
                        password_label: 'A',
                        password_stream: 'XYZ'
                    }]
                });
                res.status(200).json(user.toJSON());
            } else {
                sendLog(400, res, null, 'Invalid Otp');
            }
        } else {
            sendLog(404, res, null, 'No record found');
        }
    } catch (e) {
        next(new Error(e))
    }
}

// POST:: CREATE USER
const createUser = async (req, res, next) => {
    try {
        const user = await Users.create({ mobile: req.body.mobile });
        res.status(201).json(user.toJSON());
    } catch (e) {
        createError(500, res, e);
    }
}
module.exports = {
    getOtpForUser,
    verifyOtpForUser,
    createUser
}