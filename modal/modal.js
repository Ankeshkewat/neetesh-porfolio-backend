const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    url : String,
    text : String,
    date : {type : Date, default: new Date()},
    cat : String
})

const UserModal = mongoose.model('user',Schema);

module.exports = {UserModal};