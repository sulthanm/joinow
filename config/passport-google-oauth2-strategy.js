const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID : "414960248057-0brsgn8l01pd68ebopr96kn3538r7ktl.apps.googleusercontent.com",
    clientSecret : "spNui9dUa4hGsZy2wTeW0li9",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
},

function(accessToken, refreshToken, profile, done){
    User.findOne({email : profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log("Error in google startegy passport", err);return;
        }
        if(user){
            return done(null, user);
        }else{
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            },function(err, user){
                if(err){
                    console.log("Error in creating google startegy passport", err);return;
                }else{
                    return done(null, user);
                }
            })
        }    
    });
}

));


module.exports = passport;