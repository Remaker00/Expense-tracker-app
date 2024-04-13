const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeschema = new Schema({
    income: Number,
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }

});

module.exports = mongoose.model('Income', incomeschema);