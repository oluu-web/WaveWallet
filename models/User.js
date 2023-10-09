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

const generateAccountNumber = async () => {
 let accountNumber;
 do {

accountNumber = Math.floor(Math.random() * (9999999999- 1000000000) ) + 1000000000;
 } while (await mongoose.model('User').findOne({ accountNumber }));

 return accountNumber
}

userSchema.pre('save', async function (next) {
 if (!this.accountNumber) {
  this.accountNumber = await generateAccountNumber();
 }
 next();
});

module.exports = mongoose.model('User', userSchema);