const Post = require('../post');

module.exports.homePage = function(req, res){
    // console.log(req.cookies);
    // res.cookie('kkk', 333);
   ;
    Post.find({}).populate('userss').exec(function(err,userPosts){
        console.log(userPosts);
        return res.render('home',{
            title: "homepage",
            posts : userPosts
        });
    });

}