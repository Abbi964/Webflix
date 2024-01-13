const router = require('express').Router();
const authController = require('../controller/auth')

// Register
router.get('/register',authController.getRegister);
router.post('/register',authController.postRegister);

// Login
router.post('/login',authController.postLogin);

module.exports = router;