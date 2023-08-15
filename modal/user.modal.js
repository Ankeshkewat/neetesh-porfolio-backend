const mongosse = require('mongoose');

const Schema = mongosse.Schema({
    name: String,
    email: String,
    password: String
})

const UserModal = mongosse.model('profile', Schema);

module.exports = { UserModal };