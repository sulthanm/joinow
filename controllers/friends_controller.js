const Post = require('../models/post');
const User = require('../models/user');
const Friend = require('../models/friendship');

module.exports.addFriend = async function(req, res){
    // console.log(req.user._id,"------",req.params.id  );
    
    let friendPre = await Friend.findOne({
        to_user : req.params.id
    });
    // console.log(req.user);

    let helper;

    let userRequested = await User.findById( req.user._id).populate('friends');
    let userAccepted = await User.findById(req.params.id).populate('friends');
    // console.log(userAccepted.friends);

    let presence = false;
    console.log(req.user.friends,"andddddddd", userAccepted.friends);
    for(f of req.user.friends){
        for(f1 of userAccepted.friends){
            // console.log(f,"=======", f1._id);
            if(f.equals(f1._id)){
                helper = f;
                console.log(f,"=======", f1._id);
                presence = true;break;
            }
        }
    }
    if(presence){
        presence = true;
        // console.log("nDeletinggggg FriendShip *******",presence,helper);
        // console.log("Freind presewnt---------",friendPre);
        await Friend.findByIdAndRemove(helper._id);
        
        
        userAccepted.friends.pull(helper._id);
        userRequested.friends.pull(helper._id);
    
        userAccepted.save();
        userRequested.save();
    
        req.flash('success', 'Old Friend Removed!');
    }else{
        presence = false;
        console.log("new FriendShip Creating*******");
        let newFriend = await Friend.create({
            from_user : req.user._id,
            to_user : req.params.id 
        });
        let populateToUser = await newFriend.populate('to_user', '_id name email').execPopulate();
        // newFriend.populate('to_user').exec();
        // console.log(populateToUser,"*********");

        userRequested.friends.push(populateToUser._id);
        userAccepted.friends.push(populateToUser._id);

        userAccepted.save();
        userRequested.save();
        req.flash('success', 'New Friend Added!');
       
    }
    

    // console.log(userRequested.friends.name);
    // if(req.xhr){
    //     console.log(presence);
    //     return res.json(200, {
    //         message: "Request successful!",
    //         data: {
    //             presence: presence
    //         }
    //     });
    // }

    return res.redirect('back');
  
}