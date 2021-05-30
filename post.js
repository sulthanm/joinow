const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_content: {
        type : String,
        required : true
        // unique : true
    },
    userss : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]

},{
    timestamps : true
});

const Post =  mongoose.model('Post', postSchema);

module.exports = Post;