const express = require("express")
const Post = express.Router();
const path = require('path')
const PostSchema = require("../Schema/PostSchema") 
const mongoose = require("mongoose")
const multer = require('multer')


Post.use('/uploads',  express.static(path.join(__dirname, '..', 'uploads')));
const Posts = mongoose.model("Posts" , PostSchema)

Post.get("/" , async (req,res)=>{
    const a  = await Posts.find({})
    res.send(a)
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })

  const upload = multer({storage})

  Post.get('/:user' , async(req,res) =>{
    username = req.params.user
    const posts = await Posts.find({username:username})
    res.send(posts)
  })

Post.post('/uploads',upload.single('file') ,(req,res) =>{
    const filePath = req.file.path;
    const baseURL = 'http://localhost:4000/post'; // Change this to your server's base URL
    const imageURL = `${baseURL}/${filePath}`;
    res.status(200).json({ imageUrl: imageURL });

})


Post.post("/" , (req,res) =>{
    try{ const{name ,username ,post_text,post_image,likes , comments,time,user_image} = req.body
    const image_address = encodeURIComponent(post_image) 

    const newPost = new Posts({name, time ,username , post_text,post_image,likes , comments,user_image})

    newPost.save()}
    catch(err){(console.log(err))}
    console.log("you are hitting at post") 
    res.send("data saved successfully check get request now")
})

module.exports = Post

