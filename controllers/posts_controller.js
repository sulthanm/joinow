const Post = require('../post');
const Comment = require('../comment');
const mailingFile = require('../mailers/funcToSendMails');

const formidable = require('formidable')

module.exports.createPosts = async function(req, res){
   // console.log("above",req.file);
    try{
        Post.uploadedPost(req, res, function(err){
            if(err){
                console.log("Error in creatng post", err);return;
            }
            Post.create({
                post_content : req.body.post_content,
                userss : req.user._id,
            },function(err, posT){
                if(err){
                    console.log("Error in creatin post-------",err)
                }
             
                if(req.file){
                    // if(posT.avatar )){
                        
                    //     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        
                    // }
               
                    posT.avatar = Post.avatarPath+'/'+req.file.filename;
                    
                }
                posT.save();
                // posT.populate('userss', 'name email').execPopulate(function(err, post){
                //     if(err){
                //         console.log("Error in populating post", err);
                //     }
                //     mailingFile.sendMailForCreatingPost(post);
                // });
                
                return res.render('home', {
                    posts: posT
                });
            });
           
            
        });
         
    }catch(err){
        console.log(err,":Error in creating post");
        req.flash('error', err);
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

            let popuComment = await comment.populate('user', 'name email').execPopulate();
            console.log(popuComment.user.email,"*****************");

            mailingFile.sendMailForCreatingComment(popuComment);

            if (req.xhr){
                // console.log("xhrr requesttttt");
                return res.status(200).json({
                    data: {
                        comment: popuComment,
                        name : comment.user.name
                    },
                    message: "Comment created!"
                });
            }

            req.flash('success', 'Comment published!');
            return  res.redirect('back');
        }
        
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
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
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted!"
                });
            }
           
            req.flash('success', 'Post and associated comments deleted!');
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

            if (req.xhr){
                console.log("xhr requestttttt")
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment Deleted!"
                });
            }

            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        // req.flash('error', err);
        return;
    }
   

}