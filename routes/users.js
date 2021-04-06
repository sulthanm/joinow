const express = require('express');

const router = express.Router();

const profile = require('../controllers/users_controller');
const post = require('../controllers/posts_controller');
// const signup = require('../controllers')

router.get('/profile', profile.profilePage);
router.get('/posts', post.postsPage);
router.get('/signup', profile.signupPage);
router.get('/signin', profile.signinPage);

module.exports = router;