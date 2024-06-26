const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseschema = new Schema({
  expense: Number,
  description: String,
  category: String,
  card: String,
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

module.exports = mongoose.model('Expense', expenseschema);