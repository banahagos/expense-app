const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const expenseSchema = new Schema(
  {
    payee: { type: String },
    amount: { type: Number },
    category: { type: String },
    dateOfExpense: { type: Date },
    monthlyRecurring: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    created: {type: Date, default: Date.now }
  }, 
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.owner;
        delete ret.__v;
      }
    }
  });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;