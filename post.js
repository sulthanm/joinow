const mongoose = require('mongoose');
const user = require('./user');

const postSchema = new mongoose.Schema({
    post_content: {
        type : String,
        required : true,
        // unique : true
    },
    users : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }

},{
    timestamps : true
});

const Post =  mongoose.model('Post', postSchema);

module.exports = Post;