const mongoose = require('mongoose')

const intrestsSchema = new mongoose.Schema({
  intrest:String
})

module.exports = mongoose.model('intrests',intrestsSchema)