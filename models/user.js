const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  created: {type: Date, default: Date.now }
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.__v;
      delete ret._id;
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;