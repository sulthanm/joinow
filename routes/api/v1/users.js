const express = require('express');

const router = express.Router();

const postsApi = require('../../../controllers/api/v1/posts_api');
const usersApi = require('../../../controllers/api/v1/users_api');

const passport = require('passport');

router.get('/posts', postsApi.index);
router.post('/create-session', usersApi.createUserSession);
router.delete('/delete-post/:id',passport.authenticate('jwt', {session: false}),postsApi.deletePost);

module.exports = router;