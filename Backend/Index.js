const express = require('express');
const app = express();
const mongoose = require('mongoose')
const UserRoutes = require("./Routes/User")
const FriendsRoutes = require("./Routes/Friends")
const PostRoutes = require("./Routes/Post")
const cors = require('cors');


app.use(cors())
app.use(express.json())
app.use("/user" ,UserRoutes)
app.use("/post",PostRoutes)
app.use("/friends" , FriendsRoutes)

app.get("/" , (req, res)=>{
    res.send("This is Homepage");
})

app.get("/account", (req,res)=>{
    res.send("This is account page");
})

app.post("/", (req,res)=>{
  const  {first_name , last_name} = req.body

    console.log(req.body.first_name)
    res.send(`the first name of the user is  ${first_name}    and the last name of the user is ${last_name}`)

})

app.listen(4000);