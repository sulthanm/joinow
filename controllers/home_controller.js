const Post = require('../post');
const User = require('../user');

module.exports.homePage = async function(req, res){
    
    try{
        // populate the user of each post
        let userPosts = await Post.find({})
        .populate('userss')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
           
        return res.render('home',{
            title: "homepage",
            posts : userPosts,
            allUsers : users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
  
        
        
    

}