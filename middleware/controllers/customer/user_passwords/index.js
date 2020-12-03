const { raw } = require('express');
const { sendLog } = require('helpers/log');
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
        const updatedPasswordRecord = await UserPasswords.findOneAndUpdate(
            { user_id: userId, _id: raw.params.passwordId },
            updatePayload,
            { new: true }
        );
        if (updatedPasswordRecord)
            res.status(200).json(updatedPasswordRecord.toJSON());
        else
            sendLog(404, res, null, 'No record found');
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