const mongoose = require('mongoose')



const replySchema = new mongoose.Schema({
    userid:String,
    reply:String
})

const threadSchema = new mongoose.Schema({
 userid:String,
 date:Date,
 intrests:[String],
 tags:[String],
 questionHead:String,
 questionBody:String,
 questionImages:String,
 replies:[replySchema]
})

module.exports = mongoose.model('thread',threadSchema)