const passport = require('passport');

const LocalStrategy = require('passport-local');
const User = require('./user');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({ email : email }, function (err, userPresent) {
            if (err) { return done(err); }
            if (!userPresent ) {
            return done(null, false, { message: 'Incorrect username.' });
            }
            if (password != userPresent.password) {
            return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, userPresent);
      });
    }
  ));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.checkAuthentication = function(req,res, next){
  //if the user is sign in pass on request to next function

    if(req.isAuthenticated()){
      return next();
    }
    //if the user is not signed in

    return res.redirect('/users/signin');
}



module.exports = passport;