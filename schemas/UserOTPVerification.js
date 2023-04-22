const mongoose = require('mongoose')


const UserOTPVerificationSchema = new mongoose.Schema({
  userid:String,
  otp:String,
  createdAt:Date,
  expiresAt:Date
})

module.exports = mongoose.model('UserOTPVerification',UserOTPVerificationSchema)