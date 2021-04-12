const Post = require('../post');

module.exports.posts = function(req, res){
    // console.log(req.body);
    if(req.isAuthenticated()){
        Post.create(req.body, function(err){
            if(err){
                console.log(err, "Error while creating post");
            }
        });
    } 
    
    return  res.redirect('back');
}