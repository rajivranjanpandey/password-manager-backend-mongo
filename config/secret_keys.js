const dotenv = require('dotenv').config();

const DB_URI = process.env.DB_URI;
const JWT_SALT = 'personal_raj_1996'
module.exports = {
    DB_URI,
    JWT_SALT
}
