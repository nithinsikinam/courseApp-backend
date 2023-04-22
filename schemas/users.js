const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  EmailId:String,
  Password:String,
  Interests:String,
})

module.exports = mongoose.model('users',usersSchema)