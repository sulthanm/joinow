const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : "joinow"
}

passport.use(new JWTStrategy(opts, function(jwt_payload, done){
    console.log(jwt_payload._id);
    User.findById(jwt_payload._id, function(err, user) {
        console.log("userrrrrrr",user);
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;