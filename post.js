const mongoose = require('mongoose');
// const user = require('./user');

const postSchema = new mongoose.Schema({
    post_content: {
        type : String,
        required : true,
        // unique : true
    },
    userss : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

},{
    timestamps : true
});

const Post =  mongoose.model('Post', postSchema);

module.exports = Post;