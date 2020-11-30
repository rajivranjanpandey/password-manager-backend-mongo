const express = require('express');
const clientValidation = require('../middleware/controllers/client/index-validation');
const clientController = require('../middleware/controllers/client');
const router = express.Router();

router.post('/users/send-otp', clientValidation.usersValidation.sendOtpValidation, clientController.ClientUsersController.getOtpForUser);
router.post('/users/verify-otp', clientValidation.usersValidation.verifyOtpValidation, clientController.ClientUsersController.verifyOtpForUser);

module.exports = router;
