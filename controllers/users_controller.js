const User = require('../user');

module.exports.profilePage = function (req,res){
    return res.render('user_profile',{
        title: "joinow"
    });
}

module.exports.signupPage = function(req, res){
    return res.render('user_signup', {
        title : "joinow || Sign-Up"
    });
}

module.exports.signinPage = function(req, res){
    return res.render('user_signin', {
        title : "joinow || Sign-In"
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

// module.exports.createUserSession = function(req, res){

// }
