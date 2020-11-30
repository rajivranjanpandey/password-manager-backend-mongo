const express = require('express');
const clientRouter = require('./client');

const router = express.Router();

router.use('/client', clientRouter);

module.exports = router;