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
    Post.findById(req.body.post, function(err, post){
        if(err)console.log("Error while crratng comment");
        if(post){
            Comment.create({
                content : req.body.comment,
                post : req.body.post,
                user : req.user._id
            },function(err,comment){
                if(err)console.log("Error while crratng comment");
                post.comments.push(comment);
                post.save();
            });
        }
    });
    
    return  res.redirect('back');
}

module.exports.deletePost = function(req, res){
    console.log(req.params.id);
    Post.findById(req.params.id,function(err, post){
        //.id convets _id to string
        // if(err)console.log("Error while deleting post -err1");
        if(post.userss == req.user.id){
            post.remove();
            Comment.deleteMany({post : req.params.id}, function(err){
                // if(err)console.log("Error while deleting post -err3");
                console.log("heree...!");
                return res.redirect('back');
            });
        }else{
            return res.redirect('/');
        }
    });

}

module.exports.deleteComment = function(req, res){

    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });

}