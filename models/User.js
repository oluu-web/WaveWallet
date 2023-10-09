const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 accountNumber: {
  type: Number,
  unique: true,
 },
 firstName: {
  type: String,
  required: true,
 },
 lastName: {
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