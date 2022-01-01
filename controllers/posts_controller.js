const Post = require('../models/post');
const Comment = require('../models/comment');
const mailingFile = require('../mailers/funcToSendMails');
const s3BucketJoinow = require('../config/s3');
const sharp = require('sharp');

// const commentEmailWorker = require('../workers/comment_email_worker');
// const queue = require('../config/kue');

const Like = require('../models/like');
var url = require('url');

module.exports.createPosts = async function(req, res){

    try{
            
            let posT = await Post.create({
                post_content : req.body.post_content,
                userss : req.user._id
            });
                let filePresent = false;
                let result;
                let postFile = false;
                res.locals.file = postFile;
                if(req.file){
        
                    Post.uploadedPost(req, res, function(err){
                        if(err) console.log("Error in posting image", err);
                        res.locals.file = true;
                        filePresent = true;
                        postFile=true;
                        res.locals.file = postFile;
                        console.log(Post.avatarPath);
                        posT.avatar = Post.avatarPath + '/' + req.file.filename;
                        console.log(posT.avatar);
                        posT.save();
                    })
                    
                }
            
                posT.populate('userss', 'name email').execPopulate(function(err, post){
                    if(err){
                        console.log("Error in populating post", err);
                    }
                    mailingFile.sendMailForCreatingPost(post);
                });
                req.flash('success', "New Post Published");
                return res.redirect('back');
               
            
           
            
        
    }catch(err){
        console.log(err,":Error in creating post");
        req.flash('error', err);
        return res.redirect('back');
    }

}
module.exports.downloadPost = async function(req, res){
    // console.log(req.params.key);
    const readStream = await s3BucketJoinow.downloadFile(req.params.key);

    readStream.pipe(res);
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
      

            mailingFile.sendMailForCreatingComment(popuComment);
   
            console.log(popuComment);
            if (req.xhr){
             
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

            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

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

            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            // console.log(" noooooooooo xhr requestttttt");
            if (req.xhr){
                console.log("xhr requestttttt");
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

module.exports.likePost = async function(req, res){
    try{
        let modelWithQuery; 
        let deleted = false;
        // console.log("id----",req.query.id);
        if(req.query.type == 'Post'){
            console.log("finding model with query post");
            modelWithQuery = await Post.findById(req.query.id).populate('likes');
            console.log("----------",modelWithQuery);
        }else{
            modelWithQuery = await Comment.findById( req.query.id).populate('likes');
        }
        


        let modelPresentInLikes = await Like.findOne({
            user: req.user._id,
            onModel : req.query.type,
            likeable: req.query.id
        });
      

        if(modelPresentInLikes){
           
            modelWithQuery.likes.pull(modelPresentInLikes._id);
            modelWithQuery.save();
            modelPresentInLikes.remove();

            deleted = true;

        }else{
            
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
       
            // console.log("----------",modelWithQuery);
            modelWithQuery.likes.push(newLike._id);
           
            modelWithQuery.save();

        }
        res.locals.deleted = deleted;
        
        if(req.xhr){
            console.log("xhr requst fr deletng like");
            return res.status(200).json( {
                message: "Request successful!",
                data: {
                    deleted: deleted,
                    requestedTypeId : req.query.id,
                    type: req.query.type
                }
            });
        }
        
    }catch(err){
        if(err){
            console.log("Error in creating like-----", err);
            return res.redirect('back');
        }
    }
}