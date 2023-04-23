const mongoose = require('mongoose')

const privateFeedSchema = new mongoose.Schema({
    userid:String,
    touserid:String,
    date:Date,
    questionHead:String,
    questionBody:String,
    questionImages:String,
    replies:[String]
})

module.exports = mongoose.model('privateFeed',privateFeedSchema)