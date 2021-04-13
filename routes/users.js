const express = require('express');

const router = express.Router();
const passport = require('passport');


const profile = require('../controllers/users_controller');
const post = require('../controllers/posts_controller');
// const signup = require('../controllers')

router.get('/profile', passport.checkAuthentication ,profile.profilePage);
router.get('/signup', profile.signupPage);
router.get('/signin', profile.signinPage);
router.post('/create', profile.createUser);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'},
), profile.createUserSession);

router.get('/signout', profile.destroySession);

router.post('/create-posts',passport.checkAuthentication, post.createPosts);
router.post('/create-comment',passport.checkAuthentication,post.createComment);
router.get('/delete-post/:id',passport.checkAuthentication, post.deletePost);
router.get('/delete-comment/:id',passport.checkAuthentication, post.deleteComment)

module.exports = router;