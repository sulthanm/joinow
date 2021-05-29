const Post = require('../../../post');
const Comment = require('../../../comment');

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
    console.log("**************",req.params.id);
    try{
        let post = await Post.findById(req.params.id);
        //.id convets _id to string
            post.remove();
            await Comment.deleteMany({post : req.params.id});
           
            return res.json(500, {
                message: "Post and associated comments deleted!"
            });
        
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal server error"
        });
    }

}