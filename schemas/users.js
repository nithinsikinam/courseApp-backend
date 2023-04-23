const mongoose = require('mongoose')

const threads = require('./thread');

const usersSchema = new mongoose.Schema({
  userid:String,
  emailid:String,
  password:String,
  intrests:[String],
  verified:Boolean,

})

module.exports = mongoose.model('users',usersSchema)