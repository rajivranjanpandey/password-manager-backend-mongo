const { sendLog } = requireG('helpers/log');
const { UserPasswords } = require('../../../../models');

// GET::USER PASSWORD LIST
const getUserPasswordList = async (req, res, next) => {
    try {
        const passwordList = await UserPasswords.getListForUser(req.user._id);
        res.status(200).json(passwordList);
    } catch (e) {
        next(new Error(e));
    }
}

//POST:: CREATE A NEW USER PASSWORD RECORD
const createUserPassword = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { platform_name, platform_passwords } = req.body;
        await UserPasswords.create({
            user_id: userId,
            platform_name,
            platform_passwords
        });
        sendLog(201, res, null, 'A new record added.');
    } catch (e) {
        next(new Error(e))
    }
}

//PUT:: UPDATE A USER PASSWORD RECORD
const updateUserPassword = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const updatePayload = req.body;
        // This method replaces the whole platform password array
        const updatedPasswordRecord = await UserPasswords.findOneAndUpdate(
            { user_id: userId, _id: req.params.passwordId },
            updatePayload,
            { new: true }
        );
        res.status(200).json({ obj: updatedPasswordRecord.toJSON() });


        // This is the other way round.
        // const recordBasedOnId = await UserPasswords.findById(req.params.passwordId);
        // if (recordBasedOnId) {
        //     const promiseArr = [];
        //     // update platform name
        //     recordBasedOnId.platform_name = updatePayload.platform_name;

        //     updatePayload.platform_passwords.forEach(async (pw, index) => {
        //         // Update existing passwords
        //         if (pw.id) {
        //             promiseArr.push(await UserPasswords.findOneAndUpdate(
        //                 { _id: pw.id },
        //                 { $set: { password_label: pw.password_label, password_stream: pw.password_stream } },
        //                 { new: true }
        //             ));
        //         } else {
        //             // Add new ones
        //             recordBasedOnId.platform_passwords.push(pw);
        //         }
        //     });
        //     const updatedResults = await Promise.all(promiseArr);
        //     await recordBasedOnId.save();

        //     res.status(200).json({ obj: recordBasedOnId.toJSON() });

    } catch (e) {
        next(new Error(e))
    }
}

// DELETE:: REMOVE A USER PASSWORD RECORD
const deleteUserPassword = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const deletedRecord = await UserPasswords.findOneAndDelete({ user_id: userId, _id: req.params.passwordId });
        if (deletedRecord)
            res.status(200).json(deletedRecord.toJSON());
        else
            sendLog(404, res, null, 'No record found');

    } catch (e) {
        next(new Error(e))
    }
}
module.exports = {
    getUserPasswordList,
    createUserPassword,
    updateUserPassword,
    deleteUserPassword
}