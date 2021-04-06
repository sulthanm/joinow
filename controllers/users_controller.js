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
