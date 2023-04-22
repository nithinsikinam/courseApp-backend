const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  EmailId:String,
  Password:String,
  Group:String,
  Semester:String,
})

module.exports = mongoose.model('users',usersSchema)