const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
 amount: {
  type: Number,
  required: true,
 },
 paymentDate: {
  type: Date,
  default: Date.now,
 },
 payer: {
  type: Number,
  required: true,
 },
 payee: {
  type: Number,
  required: true,
 },
})

module.exports = mongoose.model('Payment', paymentSchema)