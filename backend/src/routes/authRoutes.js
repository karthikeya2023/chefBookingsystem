// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');




// Signup route
router.post('/signup', authController.signup);
// Login route
router.post('/login', authController.login);
router.post('/changepassword', authController.changePassword);
router.get('/users', authController.getAllUsers);
module.exports = router;
