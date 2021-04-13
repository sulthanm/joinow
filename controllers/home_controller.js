const Post = require('../post');

module.exports.homePage = function(req, res){
    // console.log(req.cookies);
    // res.cookie('kkk', 333);
    Post.find({})
    .populate('userss')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,userPosts){
        return res.render('home',{
            title: "homepage",
            posts : userPosts
        });
    });

}