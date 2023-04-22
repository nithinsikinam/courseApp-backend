const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  userid:String,
  emailid:String,
  password:String,
  intersets:String,
  profilepic:String,
  verified:Boolean
})

module.exports = mongoose.model('users',usersSchema)