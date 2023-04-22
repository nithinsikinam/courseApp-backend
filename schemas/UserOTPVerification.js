const mongoose = require('mongoose')


const UserOTPVerificationSchema = new mongoose.Schema({
  userid:String,
  otp:String,
  createdat:Date,
  expiresat:Date
})

module.exports = mongoose.model('UserOTPVerification',UserOTPVerificationSchema)