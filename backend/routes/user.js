var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/middleware');

router.route('/create').post(userController.createUser);
router.route('/login').post(userController.loginUser);

// Password reset routes
router.route('/forgotpassword').post(userController.forgotPassword);
router.route('/resetpassword').post(userController.resetPassword);
  

// Example protected route
router.route('/dashboard').get(authenticateToken, (req, res) => {
    res.status(200).json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
