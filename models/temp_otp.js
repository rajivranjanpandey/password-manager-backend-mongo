const mongoose = require('mongoose');

const tempOtpSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
        match: /^[0-9]{10}$/,
        unique: true
    },
    otp: {
        type: Number,
        required: true,
        match: /^[0-9]{4}$/
    }
}, { timestamps: { createdAt: false, updatedAt: false } });

tempOtpSchema.statics.findByMobile = function (mobile) {
    return this.find({ mobile: Number(mobile) });
}
module.exports = TempOtp = mongoose.model('temp_otp', tempOtpSchema);