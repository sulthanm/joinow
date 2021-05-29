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
        message : "postsV2",
        posts : userPosts
    });
}