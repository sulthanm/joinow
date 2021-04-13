const Post = require('../post');
const User = require('../user');

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
        User.find({}, function(err, users){
            return res.render('home',{
                title: "homepage",
                posts : userPosts,
                allUsers : users
            });
        })
        
    });

}