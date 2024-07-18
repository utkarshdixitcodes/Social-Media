const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    profile_image : String ,
    
    first_name : {
            type :String ,
            required : true
        },
    last_name : {
            type :String ,
            required : true
         }, 
    username : {
        type: String,
        required:true
    } ,
    phone_number :   {
        type :Number ,
        required : true
    } ,
    user_Profile : {
        type:String, 
        default : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1709337600&semt=ais"
    },
    email:  {
        type :String ,
        required : false
    },
    age : Number,
    
    password : {
        type:String,
    },
    gender: String,
    nickname : String , 
    friends : [] ,
   
    about: {
        type: String,
        default: '' // Set default value to an empty string
    },
    zodiac: {
        type: String,
        default: '' // Set default value to an empty string
    }
    , 
    color : String 
    

  
})

module.exports = UserSchema