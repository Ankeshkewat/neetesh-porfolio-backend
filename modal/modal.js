const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    url : String,
    text : String,
    date : Date
})

const UserModal = mongoose.model('user',Schema);

module.exports = {UserModal};