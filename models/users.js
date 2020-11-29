const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: false,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        unique: true,
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

// schema.statics.fnName are called over models.
// schema.virtual(virtualName) is not stored but used for client operation.

module.exports = Users = mongoose.model('users', usersSchema);