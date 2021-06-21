const User = require('../models/user');

const fs = require('fs');
const path = require('path');
const s3BucketJoinow = require('../config/s3');
const passport = require('../config/passport-local-strategy');

module.exports.profilePage = function (req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title: "Joinow || Profile_Page",
            profile_user: user
        });
    });
    
}

module.exports.signupPage = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signup', {
        title : "Joinow || Sign-Up"
    });
}

module.exports.signinPage = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin', {
        title : "Joinow || Sign-In"
    });
}

module.exports.createUser = function(req, res){
    // console.log("yess");
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, function(err, userPresent){
        if(err){console.log('Error in creating user');return;}
        if(!userPresent){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user');return;}
                // return res.render('user_signin',{
                //     title:"joinow"
                // });
                return res.redirect('/users/signin');
            });
        }else{
            return res.redirect('back');
        }
    });

}

module.exports.createUserSession = function(req, res){

    req.flash('success', 'ThankYou for Signing In');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.flash('success', 'You have logged Out');
    req.logout();
    return res.redirect('/users/signin');
}

module.exports.profieUpdate = async function(req, res){
    let user = await User.findById(req.params.id);

        user.name = req.body.name;
        user.email = req.body.email;
        // console.log(req.file);
        let result;
        if(req.file){
            
            result = await s3BucketJoinow.uploadFile(req.file);
            console.log(req.file);
            console.log("files pushed to buc",result);
            filePresent = true;      
            user.avatar = `users/profile-updateavatar/${result.key}`
            user.avatarKey = result.key;
            
        }
        user.save();
        return res.redirect('back');


    
} 

module.exports.downloadAvatar = async function(req, res){
    console.log("meassadfjogfiojogi",req.params.key);
    const readStream = await s3BucketJoinow.downloadFile(req.params.key);
    readStream.pipe(res);
}