const mongoose = require('mongoose');
const SessionSchema = require('../schema/sessionSchema').SessionSchema

const Session = mongoose.model('session', SessionSchema)

module.exports = {
    Session
}