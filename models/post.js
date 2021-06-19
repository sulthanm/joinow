const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/ImagePosts');

const postSchema = new mongoose.Schema({
    post_content: {
        type : String,
        // required : true
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
    ],
    avatar:{
        type: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

},{
    timestamps : true
});


// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'..',AVATAR_PATH))
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now());
//     }
// });

// postSchema.statics.uploadedPost = multer({ storage: storage }).single('avatar');
postSchema.statics.avatarPath = AVATAR_PATH;

const Post =  mongoose.model('Post', postSchema);

module.exports = Post;