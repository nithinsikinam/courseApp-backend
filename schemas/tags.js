const mongoose = require('mongoose')

const tagsSchema = new mongoose.Schema({
  tag:String
})

module.exports = mongoose.model('tags',tagsSchema)