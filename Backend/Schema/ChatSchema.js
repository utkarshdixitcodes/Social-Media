const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema =  new Schema({
    username :  String,
    companion : String , 
    messages: [{
        text: String,
        time: { type: Date, default: Date.now }
    }]
})

const ChatModel = mongoose.model("ChatModel" , ChatSchema)

module.exports = ChatModel