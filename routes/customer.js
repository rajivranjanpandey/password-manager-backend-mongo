const express = require('express');
const customerValidation = require('../middleware/controllers/customer/index-validation');
const customerController = require('../middleware/controllers/customer');

const router = express.Router();

router.get('/user_passwords',
    customerController.CustomerUserPasswordController.getUserPasswordList
);
router.post('/user_passwords',
    customerValidation.UserPasswordValidation.createUserPasswordValidation,
    customerController.CustomerUserPasswordController.createUserPassword
);
router.put('/user_passwords/:passwordId',
    customerValidation.UserPasswordValidation.updateUserPasswordValidation,
    customerController.CustomerUserPasswordController.updateUserPassword
);
router.delete('/user_passwords/:passwordId',
    customerController.CustomerUserPasswordController.deleteUserPassword
);

router.get('/profile',
    customerController.UserProfileController.getUserDetails
);
router.put('/profile',
    customerValidation.UserProfileValidation.updateUserProfileValidation,
    customerController.UserProfileController.updateUserDetails
);

module.exports = router;