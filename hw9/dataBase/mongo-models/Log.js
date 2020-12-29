const { Schema, model } = require('mongoose');

const LogSchema = new Schema({
    time: {
        type: Date,
        default: Date.now,
    },

    message: {
        type: String,
        required: true
    }
});

module.exports = model('log', LogSchema);
