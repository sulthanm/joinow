const Post = require('../post');

module.exports.createPosts = function(req, res){
    // console.log(req.body);
    if(req.isAuthenticated()){
        Post.create({
            post_content : req.body.post_content,
            userss : req.user._id
        }, function(err){
            if(err){
                console.log(err, "Error while creating post");
            }
        });
    } 
    
    return  res.redirect('back');
}