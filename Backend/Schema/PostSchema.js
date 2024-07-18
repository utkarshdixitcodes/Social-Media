const mongoose = require('mongoose')
const {Schema} = mongoose


const CommentSchema = new Schema({
    user: String, // Name of the user who commented
    comment_text: String, // Text of the comment
    commentedAt: { type: Date, default: Date.now } // Timestamp of the comment
});
const PostSchema = new Schema({
    name: String,
    username: String,
    user_image: String,
    post_text: String,
    postedAt: { type: Date, default: Date.now },
    post_image: String,
    likes: Number,
    comments: [CommentSchema],
});

module.exports  = PostSchema