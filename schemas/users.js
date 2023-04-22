const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  UserId:String,
  EmailId:String,
  Password:String,
  Intrests:String,
  verified:Boolean
})

module.exports = mongoose.model('users',usersSchema)