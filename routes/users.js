const express = require('express');

const router = express.Router();

const profile = require('../controllers/users_controller');
const post = require('../controllers/posts_controller');

router.get('/profile', profile.profilePage);
router.get('/posts', post.postsPage);

module.exports = router;