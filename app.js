const express = require('express');
const mongoose = require('mongoose');
const { DB_URI } = require('./config/secret_keys');
const apiRouters = require('./routes');
const app = express();
app.use(express.json());

mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Mongoose connected'))
    .catch(err => console.log(err));

app.use('/api', apiRouters);

app.listen(3000, () => console.log('Server started'));
