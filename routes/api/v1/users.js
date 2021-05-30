const express = require('express');

const router = express.Router();

const postsApi = require('../../../controllers/api/v1/posts_api');
const usersApi = require('../../../controllers/api/v1/users_api');

router.get('/posts', postsApi.index);
router.post('/create-session', usersApi.createUserSession);
router.get('/delete-post/:id',postsApi.deletePost);

module.exports = router;