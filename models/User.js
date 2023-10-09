const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 accountNumber: {
  type: Number,
  unique: true,
 },
 name: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  unique: true,
  required: true,
 },
 accountBalance: {
  type: Number, 
  default: 0.00,
 }
});

module.exports = mongoose.model('User', userSchema);