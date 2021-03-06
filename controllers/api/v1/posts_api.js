const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
const User = require('../../../models/user');

module.exports.index = async function(req, res){
    let userPosts = await Post.find({})
        .sort('-createdAt')
        .populate('userss')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
    });

    return res.json(200, {
        message : "postsV1",
        posts : userPosts
    });
}

module.exports.deletePost = async function(req, res){
    // console.log("**************",req.params.id);
    try{
        let post = await Post.findById(req.params.id);
        //.id convets _id to string
        // console.log("id of requested post",post);
        console.log(post);
        if(post.userss == req.user.id){
        
            post.remove();
            await Comment.deleteMany({post : req.params.id});
        
            return res.json(200, {
                message: "Post and associated comments deleted!"
            });
        }
        else{
            // console.log("33333333333333333333")
            return res.json(401, {
                message: "Your cant delete this post!"
            });
        }
         
        
        
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal server error"
        });
    }

}