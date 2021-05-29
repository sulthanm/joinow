const express = require('express');

const router = express.Router();
const home = require('../controllers/home_controller');


console.log("router loaded");

router.get('/', home.homePage);
router.use('/users', require('./users'));

router.use('/api', require('./api'));


module.exports = router;