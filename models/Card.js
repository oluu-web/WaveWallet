const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
 cardNumber: {
  type: String,
  unique: true,
  required: true,
 },
 user: {
  type: Number,
  required: true,
 },
});

module.exports = mongoose.model('Card', cardSchema);