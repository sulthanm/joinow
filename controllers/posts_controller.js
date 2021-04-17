const Post = require('../post');
const Comment = require('../comment');

module.exports.createPosts = async function(req, res){
    // console.log(req.body);
    
    try{
        let post = await Post.create({
            post_content : req.body.post_content,
            userss : req.user._id
        });
        return res.redirect('back');
    }catch(err){
        return res.redirect('back');
    }

}

module.exports.createComment = async function(req,res){
    try{
        let post =await Post.findById(req.body.post);
        
        if(post){
            let comment = await Comment.create({
                content : req.body.comment,
                post : req.body.post,
                user : req.user._id
            });
            post.comments.push(comment);
            post.save();
            // req.flash('success', 'Comment published!');
            return  res.redirect('back');
        }
        
    }catch(err){
        // req.flash('error', err);
        console.log(err);
    }
    
}

module.exports.deletePost = async function(req, res){
    // console.log(req.params.id);
    try{
        let post = await Post.findById(req.params.id);
        //.id convets _id to string
     
        if(post.userss == req.user.id){
            post.remove();
            await Comment.deleteMany({post : req.params.id});

            // req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
            
        }else{
            return res.redirect('/');
        }
    }catch(err){
        // req.flash('error', err);
        return res.redirect('back');
    }

}

module.exports.deleteComment = async function(req, res){

    try{
        let comment =await Comment.findById(req.params.id);
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            // req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        // req.flash('error', err);
        return;
    }
   

}