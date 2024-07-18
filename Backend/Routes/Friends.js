const express= require('express')
const Friends = express.Router()
const  FriendsModel =  require('../Schema/FriendsSchema')
const ChatModel = require('../Schema/ChatSchema')

Friends.use(express.json())

Friends.get('/:username' , async(req,res)=>{
const username = req.params.username
// console.log(username)
const users = await FriendsModel.find({username : username})
res.send(users) 
})

Friends.get('/requests/:username' , async(req,res)=>{
    try{
const username = req.params.username
// console.log(username)
const user = await FriendsModel.findOne({username:username})
if(user){
res.send(user.ReceivedRequests)
}
else{
    res.status(404).send("user not found")
}
    }
    catch(err) {
        console.log(err)
    }
})

Friends.post('/request' , async(req,res)=>{
    console.log(req.body)
    const {sender , recipient} =req.body
    console.log("Sender is :" , sender)
    console.log("Reciepient is :" ,recipient)
    // console.log(sender+recipient)
    const reqReceiver = await FriendsModel.findOne({username:recipient})
    const reqSender = await FriendsModel.findOne({username : sender})

    console.log(reqReceiver)
    if(reqReceiver){
        const checkRequest = reqReceiver.ReceivedRequests.filter(item => item.sender === sender )
        if(checkRequest.length===0){
            reqReceiver.ReceivedRequests.push({sender:sender})
            reqReceiver.save()
         res.send(reqReceiver)
        }
        }   

        if(reqSender){
            const checkRequest = reqSender.SendRequests.filter(item => item.sender === sender )
            if(checkRequest.length===0){
                reqSender.SendRequests.push({receiver:recipient})
                reqSender.save()
            //  res.send(reqSender)
            }
            } 
    //    res.send("Request has been saved successfully")     
    })

    Friends.post("/accept/:username" , async(req,res)=>{
        try{
        const requestUser = req.body.sender
        console.log(requestUser)
        console.log("The sender of request " , requestUser)
        const username = req.params.username
            const Receiver_Model = await FriendsModel.findOneAndUpdate(
                {username:username},
                {
                $pull :{ReceivedRequests: {sender:requestUser}},
                $push: {friends: requestUser}
                },
                {new : true}
               )   
            const Sender_Model = await FriendsModel.findOneAndUpdate(
                {username:requestUser},
                {
                $pull : {SendRequests : {receiver : username}},
                $push : {friends : username}
                },
                {new:true}
            )    

               const Chats =new ChatModel({username : username , companion : requestUser})
               Chats.save()
}
            catch(err){console.log(err)
            } 
    })

    Friends.post("/check/:username" ,async (req,res)=>{
        const loggedusername  = req.params.username
        const { username} = req.body
        const response = await FriendsModel.findOne({username:loggedusername})
        if(response !== null && response.friends !== undefined){
            const friendsArray = response.friends
            const checkIfFriendExists = friendsArray.filter(item => item===username)
        if(checkIfFriendExists.length>0){
            res.status(200).send("you are Friends with " + username)
            console.log("you are friends")
        }
        }
        else{
            res.status(300).send("you are not friends")
            console.log("you are not friends")
        }
        

    })


module.exports = Friends
