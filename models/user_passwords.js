const mongoose = require('mongoose');

const userPasswordSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    platform_name: {
        type: String,
        required: true
    },
    platform_passwords: [{
        password_label: {
            type: String,
            required: true,
            trim: true
        },
        password_stream: {
            type: String,
            required: true
        }
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

userPasswordSchema.statics.findListForUser = function (userId) {
    return this.find({ user_id: userId });
}

module.exports = UserPasswords = mongoose.model('user_passwords', userPasswordSchema);