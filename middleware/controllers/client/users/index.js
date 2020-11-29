const { Users } = require("../../../../models");

// POST:: CREATE USER
const createUser = async (req, res, next) => {
    try {
        const user = await Users.create({ mobile: req.body.mobile });
        res.status(201).json(user.toJSON());
    } catch (e) {
        res.status(500).json(e);
    }
}
module.exports = {
    createUser
}