const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    userid:String,
    answer:String,
    images:[String],
    date:Date,
    valid:Boolean
})

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
 replies:[replySchema],
 answers:[answerSchema]
})

module.exports = mongoose.model('thread',threadSchema)