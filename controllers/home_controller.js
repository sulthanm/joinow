const Post = require('../post');
const User = require('../user');
module.exports.homePage = async function(req, res){
    
    try{
        // populate the user of each post
    
        let userPosts = await Post.find({})
        .sort('-createdAt')
        .populate('userss')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
        // console.log(userPosts);
        return res.render('home',{
            title: "homepage",
            posts : userPosts,
            allUsers : users
        });

    }catch(err){
        console.log('Error in rendering homePage', err);
        return;
    }
  
        
        
    

}