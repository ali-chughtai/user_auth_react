var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');


router.route('/create').post(userController.createUser);
router.route('/login').post(userController.loginUser);

module.exports = router;
