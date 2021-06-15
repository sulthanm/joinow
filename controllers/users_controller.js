const User = require('../models/user');

const fs = require('fs');
const path = require('path');

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
    //we cant update by User.findByIdAndUpdate because its now multipart form-data(which we cant get in body-parser), so using static func whch is globally initialised in userScheme as it has req

    User.uploadedAvatar(req, res, function(err){
        console.log(req.body);
        if(err){console.log("error in multer22 ", err);}
        //we are able to read body because of multer(as this form has file)
        user.name = req.body.name;
        user.email = req.body.email;
        console.log(req.file);
        if(req.file){
            if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                
                fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                
            }
       
            user.avatar = User.avatarPath+'/'+req.file.filename;
            
        }
        user.save();
        return res.redirect('back');

    });
    
} 