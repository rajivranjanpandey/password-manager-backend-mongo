const express = require('express');
require('./helpers/globals'); // initialize global variables
const mongoose = require('mongoose');
const { DB_URI } = require('./config/secret_keys');
const apiRouters = require('./routes');
const { sendLog } = requireG('helpers/log');

const app = express();
app.use(express.json());

mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Mongoose connected'))
    .catch(err => console.log(err));

// API MIDDLEWARE.
app.use('/api', apiRouters);

// GENERIC ERROR MIDDLEWARE
app.use((err, req, res, next) => {
    console.log(err.message, err.code)
    sendLog(500, res, err);
})

app.listen(3000, () => console.log('Server started'));
