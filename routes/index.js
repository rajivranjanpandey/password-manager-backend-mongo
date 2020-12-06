const express = require('express');
const clientRouter = require('./client');
const customerRouter = require('./customer');
const validateAuthToken = require('../middleware/controllers/routers-validation/auth_token_validation');
const router = express.Router();

router.use('/client', clientRouter);
router.use('/customer', validateAuthToken, customerRouter);

module.exports = router;