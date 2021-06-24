const Post = require('../models/post');
const User = require('../models/user');
const s3BucketJoinow = require('../config/s3');
module.exports.homePage = async function(req, res){
    
    try{
        // populate the user of each post
    
        let userPosts = await Post.find({})
        .sort('-createdAt')
        .populate('userss')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({}).populate({
            path:'friends',
            populate:{
             path:'from_user'   
            }
        }).populate({
            path:'friends',
            populate:'to_user'
        });
        
        
        return res.render('home',{
            title: "joinow",
            posts : userPosts,
            allUsers : users
        });

    }catch(err){
        console.log('Error in rendering homePage', err);
        return;
    }
  
}

module.exports.downloadAvatar = async function(req, res){
    console.log("meassadfjogfiojogi",req.params.key);
    const readStream = await s3BucketJoinow.downloadFile(req.params.key);
    readStream.pipe(res);
}