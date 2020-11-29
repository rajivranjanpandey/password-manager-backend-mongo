const express = require('express');
const { ClientUsersController } = require('../middleware/controllers/client');
const { userCreateValidation } = require('../middleware/controllers/client/users/validation');

const router = express.Router();

router.post('/users', userCreateValidation, ClientUsersController.createUser);

module.exports = router;