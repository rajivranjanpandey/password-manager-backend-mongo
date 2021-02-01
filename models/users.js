const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SALT } = requireG('config/secret_keys');

const usersSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: false,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        // unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        match: /^[0-9]{10}$/,
        unique: true
    },
    profile_picture: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// schema.set is used for toJSON and toObject to enable certain properties like getters and virtuals.
usersSchema.set('toJSON', { getters: true, virtuals: true });
// schema.methods.fnName are called over instance known as documents in mongoose.
usersSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, JWT_SALT, { expiresIn: 360000 }).toString();
}
// schema.statics.fnName are called over models.
usersSchema.statics.findByMobile = function (mobile) {
    return this.findOne({ mobile: Number(mobile) });
}
// schema.virtual(virtualName) is not stored but used for client operation.

module.exports = Users = mongoose.model('users', usersSchema);