const express = require("express");
const User = express.Router();
const mongoose = require("mongoose")
const { Schema } = mongoose;
const UserSchema = require("../Schema/UserSchema")
const cors = require('cors')
const jwt = require("jsonwebtoken")
const secret = "qwert6y7uiokjhgfdsxcvbnm"
const Cookies = require('js-cookie')
const multer = require('multer')
const path = require('path')
 const FriendsModel =require ( "../Schema/FriendsSchema");


User.use('/profiles',  express.static(path.join(__dirname, '..', 'profiles')));

User.use(express.json())
User.use(cors())
const p = async() =>{
const db =  await  mongoose.connect("mongodb://127.0.0.1:27017/Users")
}

p()
const usernameSchema = new Schema({
    username:String
})
const usernamedata = mongoose.model("usernamedata",usernameSchema)
const Users = mongoose.model("Users",UserSchema)

  User.get("/" , async (req,res)=>{
    const data  = await Users.find()
    res.send(data)
  })

  const authentication = (req,res,next) =>{
    try{
    const token = req.headers.authorization.split(' ')[1]
    if(!token)
    {
      res.status(400).send('No Token or Session Found ')
    }
    const verifiedUser = jwt.verify(token , "secretkey" ,)
    if(!verifiedUser)
    {
      res.status(401).send("Invalid Token")
    }
    else{
      res.status(200).send(verifiedUser)
      next()
    }
  }
  catch(err){
    res.send(err)
  }
  }

 User.get("/logged",authentication ,(req,res)=>{
})


 User.post("/", (req,res)=>{
        const {first_name, last_name,email,age,phone_number,password,username ,gender} = req.body
        const userNameData = new usernamedata({username})
        userNameData.save()
        const Friends = new FriendsModel({username})
          Friends.save()
        const NewUser = new Users({first_name,last_name,email,age,phone_number,password,username ,gender}) 
        NewUser.save()
        res.send("Data saved in the database Successfully !!!")
    })

User.post('/authentication',async (req,res)=>{
          const {username , password} = req.body
          const name =  await Users.findOne({username:username}).lean()
          console.log(name)
          if(!name){
            if(username){
              res.status(401).send("Enter Correct Username")
            }
          else{
              res.status(401).send("Enter Credentials")
              }
        }
          else {
            if(password==null){
            res.status(401).send("Enter Password")
            }
          else {
            if (name.password == password) {
              const token = jwt.sign(name , "secretkey" )
              res.status(200).json(token)
         }
          else{
          res.status(401).json("Incorrect password , Try Again")
          }  
      }
        }  
      })

  User.get('/:username' , async(req,res) =>{
    const parameter = req.params.username
    const users = await Users.findOne({username:parameter})
    if(users){
      res.send(users)
    }
    else{
      res.status(404).json("user not found")
    }
  })    

  User.put('/:username' ,async(req,res)=>{
    const parameter = req.params.username
    const updatedObject = req.body
    const users = await Users.findOneAndUpdate({username:parameter} , updatedObject)
    res.status(200).send("Data in the Database has been updated")
  })

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'profiles/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({storage})

  User.post('/profiles' , upload.single('file') ,(req,res) =>{
    const filePath = req.file.path;
    console.log(filePath)
    const baseURL = 'http://localhost:4000/user'; // Change this to your server's base URL
    const imageURL = `${baseURL}/${filePath}`;
    console.log(imageURL)
    res.status(200).json({ imageUrl: imageURL });
  })
      
  module.exports = User



   