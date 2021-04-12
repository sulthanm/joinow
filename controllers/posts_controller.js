const Post = require('../post');
const Comment = require('../comment');

module.exports.createPosts = function(req, res){
    // console.log(req.body);
    
    Post.create({
        post_content : req.body.post_content,
        userss : req.user._id
    }, function(err){
        if(err){
             console.log(err, "Error while creating post");
        }
    });
    
    
    return  res.redirect('back');
}

module.exports.createComment = function(req,res){
    const userId = req.user._id;
    Comment.create({
        content : req.body.comment,
        post : req.user._id,
        user : req.user._id
    },function(err){
        if(err)console.log("Error while crratng comment");return;
    });
    return  res.redirect('back');
}