const mongoose = require('mongoose')
const {Schema} = mongoose

const FriendsSchema = new Schema ({
    username : String ,
    friends : [{type:String}] , 
    SendRequests : [{type : Object}] , 
    ReceivedRequests : [{type : Object}]
})
const FriendsModel = mongoose.model("Friends", FriendsSchema)


module.exports= FriendsModel